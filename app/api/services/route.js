import { NextResponse } from "next/server";
import db from "@/models";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request) {
  try {
    const services = await db.Service.findAll({
      include: [
        {
          model: db.Company,
          as: "Companies",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { error: "Only admins can manage services" },
        { status: 403 },
      );
    }

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Service name is required" },
        { status: 400 },
      );
    }

    const service = await db.Service.create({
      name,
      description,
    });

    return NextResponse.json(
      {
        message: "Service created successfully",
        service,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating service:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return NextResponse.json(
        { error: "Service with this name already exists" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 },
    );
  }
}
