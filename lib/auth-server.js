"use server";

import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import db from "@/models";

export async function getCurrentUser() {
  const token = cookies().get("token")?.value;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded?.id) return null;

  return await db.User.findByPk(decoded.id, {
    attributes: ["id", "name", "email", "role"],
  });
}
