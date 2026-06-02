"use server";

import db from "@/models";
import { revalidatePath } from "next/cache";
import { companySchema } from "./schema";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function createCompany(data) {
  try {
    // console.log("data---", data);

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized: No active session found.",
      };
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return {
        success: false,
        message: "Unauthorized: Invalid or expired session.",
      };
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
      return {
        success: false,
        message: "company email already exits",
      };
    }

    const company = await db.Company.create({
      name,
      email,
      location,
      createdBy: decoded.id,
    });
    if (users && users.length > 0) {
      await company.addUsers(users);
    }

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
}
