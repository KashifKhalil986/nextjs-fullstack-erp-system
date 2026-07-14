"use server";

import db from "@/models";
import { revalidatePath } from "next/cache";
import { companySchema } from "./validations";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

async function getUserIdFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded?.id) return null;

  return decoded.id;
}

export async function createCompany(data) {
  try {
    const userId = await getUserIdFromToken();

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const validationResult = companySchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { name, email, location, users } = validationResult.data;

    const existingCompany = await db.Company.findOne({
      where: { email },
    });

    if (existingCompany) {
      return { success: false, message: "company email already exits" };
    }

    const company = await db.Company.create({
      name,
      email,
      location,
      createdBy: userId,
    });

    if (users?.length) {
      await company.addUsers(users);
    }

    revalidatePath("/dashboard");

    return { success: true, message: "Company created successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
