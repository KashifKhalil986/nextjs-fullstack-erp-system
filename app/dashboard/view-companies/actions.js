"use server";

import db from "@/models";
import { revalidatePath } from "next/cache";

export async function addUserToCompany(companyId, userIds) {
  const company = await db.Company.findByPk(companyId);

  await company.addUsers(userIds);

  revalidatePath("/dashboard/view-companies");

  return { success: true, message: "Users added successfully" };
}

export async function removedUserFromCompany(companyId, userId) {
  const company = await db.Company.findByPk(companyId);

  await company.removeUser(userId);

  revalidatePath("/dashboard/view-companies");

  return { success: true, message: "User removed successfully" };
}

export async function addServicesToCompany(companyId, serviceIds) {
  const company = await db.Company.findByPk(companyId);

  await company.addServices(serviceIds);

  revalidatePath("/dashboard/view-companies");

  return { success: true, message: "Services added successfully" };
}

export async function removeServiceFromCompany(companyId, serviceId) {
  const company = await db.Company.findByPk(companyId);

  await company.removeService(serviceId);

  revalidatePath("/dashboard/view-companies");

  return { success: true, message: "Service removed successfully" };
}
