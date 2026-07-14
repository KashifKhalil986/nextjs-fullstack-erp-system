"use server";

import { prisma } from "../../lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/auth";

export type LoginState = {
  error: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const admin = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    return {
      error: "Invalid email or password.",
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isPasswordCorrect) {
    return {
      error: "Invalid email or password.",
    };
  }
    const token = generateToken(admin.id, admin.email);

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}



