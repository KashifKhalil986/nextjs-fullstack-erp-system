"use server";

import { prisma } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message: string;
};

export async function deleteContact(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id")?.toString();
console.log("Deleting contact with ID:", id);
  if (!id) {
    return {
      success: false,
      message: "Contact ID is required.",
    };
  }

  try {
    await prisma.contact.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Contact message deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return {
      success: false,
      message: "Failed to delete contact message.",
    };
  }
}
