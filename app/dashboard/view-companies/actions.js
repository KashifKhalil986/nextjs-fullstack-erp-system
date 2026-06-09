"use server";

import db from "@/models";
import { revalidatePath } from "next/cache";
import { Op } from "sequelize";

export async function addUserToCompany(companyId, userIds) {
  if (!companyId) {
    return { success: false, message: "company id is required" };
  }
  const company = await db.Company.findByPk(companyId);

  await company.addUsers(userIds);

  revalidatePath("/dashboard/view-companies");

  return { success: true, message: "Users added successfully" };
}

export async function removedUserFromCompany(companyId, userId) {
  if (!companyId) {
    return { success: false, message: "company id is required" };
  }
  const company = await db.Company.findByPk(companyId);

  await company.removeUser(userId);

  revalidatePath("/dashboard/view-companies");

  return { success: true, message: "User removed successfully" };
}

export async function addServicesToCompany(companyId, serviceIds) {
  if (!companyId) {
    return { success: false, message: "company id is required" };
  }
  const company = await db.Company.findByPk(companyId);

  await company.addServices(serviceIds);

  revalidatePath("/dashboard/view-companies");

  return { success: true, message: "Services added successfully" };
}

export async function removeServiceFromCompany(companyId, serviceId) {
  if (!companyId) {
    return { success: false, message: "company id is required" };
  }
  const company = await db.Company.findByPk(companyId);

  await company.removeService(serviceId);

  revalidatePath("/dashboard/view-companies");

  return { success: true, message: "Service removed successfully" };
}

export async function editCompany(companyId, data) {
  try {
    // IF THERE IS NO COMPANY ID return

    if (!companyId || !data.name || !data.location) {
      return {
        success: false,
        message: "Name,location and company id are required",
      };
    }

    const company = await db.Company.findByPk(companyId);

    if (!company) {
      return { success: false, message: "Company not found" };
    }

    await company.update({
      name: data.name,
      location: data.location,
    });

    revalidatePath("/dashboard/view-companies");

    return { success: true, message: "Company updated successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function deleteCompany(companyId) {
  try {
    // add checks
    const company = await db.Company.findByPk(companyId);
    if (!company) {
      return { success: false, message: "Company not found" };
    }
    await company.setUsers([]);

    await company.destroy();

    revalidatePath("/dashboard/view-companies");

    return { success: true, message: "Company deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
