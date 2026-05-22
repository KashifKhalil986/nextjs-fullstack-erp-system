import db from "@/models";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser(req);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { error: "Only admins can manage service assignments" },
        { status: 403 },
      );
    }

    const { companyId, serviceIds } = await req.json();

    if (!companyId || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      return NextResponse.json(
        { message: "companyId and at least one serviceId are required" },
        { status: 400 },
      );
    }

    const { Company, Service } = db;

    const company = await Company.findByPk(companyId);

    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 },
      );
    }

    const services = await Service.findAll({
      where: {
        id: serviceIds,
      },
    });

    if (services.length === 0) {
      return NextResponse.json(
        { message: "No valid services found" },
        { status: 404 },
      );
    }

    await company.addServices(services);

    return NextResponse.json({
      message: "Services assigned successfully",
    });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const currentUser = await getCurrentUser(req);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { error: "Only admins can manage service assignments" },
        { status: 403 },
      );
    }

    const { serviceId, companyId } = await req.json();

    if (!serviceId || !companyId) {
      return NextResponse.json(
        { message: "serviceId and companyId are required" },
        { status: 400 },
      );
    }

    const { Service, Company } = db;

    const company = await Company.findByPk(companyId);

    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 },
      );
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    await company.removeService(service);

    return NextResponse.json({
      message: "Service removed from company successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
