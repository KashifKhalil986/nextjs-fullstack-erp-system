"use server";

import db from "@/models";
import { revalidatePath } from "next/cache";

export async function createCompany(data) {
  try {
    const { name, email, location, users } = data;
    if (!name || !email || !location) {
      return {
        success: false,
        message: "Name, email, and location are required.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    const company = await db.Company.create({
      name,
      email,
      location,
    });

    if (users && users.length > 0) {
      await company.addUsers(users); // Sequelize many-to-many
    }

    revalidatePath("/dashboard");

    return { success: true, company };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create company");
  }
}
