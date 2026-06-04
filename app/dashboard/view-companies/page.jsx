"use server";
import db from "@/models";
import ViewCompaniesComponent from "./main";

export default async function ViewCompanyPage() {
  try {
    const companies = await db.Company.findAll({
      include: [
        {
          model: db.User,
          as: "Users",
        },
        {
          model: db.Service,
          as: "Services",
        },
      ],
    });
    const users = await db.User.findAll({
      attributes: ["id", "name", "email"],
    });

    const services = await db.Service.findAll();

    return (
      <ViewCompaniesComponent
        companies={JSON.parse(JSON.stringify(companies))}
        users={JSON.parse(JSON.stringify(users))}
        services={JSON.parse(JSON.stringify(services))}
      />
    );
  } catch (error) {
    return <p className="text-red-500">{error.message}</p>;
  }
}
