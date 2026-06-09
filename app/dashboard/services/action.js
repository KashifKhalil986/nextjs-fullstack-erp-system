"use server";
import db from "@/models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { serviceSchema } from "./serviceSchema";
import cloudinary from "@/lib/cloudinary";

async function getUserIdFromToken() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded?.id) return null;

  return decoded.id;
}

export async function createService(formData) {
  try {
    // get user id from token
    const userId = await getUserIdFromToken();
    // if no user id return
    if (!userId) return { success: false, message: "Unauthorized" };
    // validations
    const raw = {
      name: formData.get("name"),
      description: formData.get("description"),
    };
    const { success, error, data } = serviceSchema.safeParse(raw);
    // if validation fails return
    if (!success) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }

    const imageFile = formData.get("image");
    //destructing
    const { name, description } = data;

    const existingService = await db.Service.findOne({
      where: { name },
    });
    if (existingService) {
      return { success: false, message: "service name already exits" };
    }

    let imageUrl = null;
    let publicId = null;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "services",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    await db.Service.create({
      name,
      description,
      image: imageUrl,
      public_id: publicId,
    });

    revalidatePath("/dashboard/services");

    return {
      success: true,
      message: "Service created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteService(serviceId) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) return { success: false, message: "Unauthorized" };

    const service = await db.Service.findByPk(serviceId);
    if (!service) return { success: false, message: "Service not found" };

    // Delete image from Cloudinary
    if (service.public_id) {
      await cloudinary.uploader.destroy(service.public_id);
    }

    await service.destroy();

    revalidatePath("/dashboard/services");

    return { success: true, message: "Service deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
