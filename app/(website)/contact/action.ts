"use server";

import { prisma } from "@/app/lib/db";

async function verifyRecaptcha(token: string | undefined) {
  if (!token) return false;

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: token,
    }),
  });

  const data = await res.json();
  return data.success === true;
}

export async function sendMessage(
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData
) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const recaptchaToken = formData.get("recaptchaToken")?.toString();

  if (!name || !email || !message) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return {
      success: false,
      message: "reCAPTCHA verification failed. Please try again.",
    };
  }

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    return {
      success: true,
      message: "Message sent successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}