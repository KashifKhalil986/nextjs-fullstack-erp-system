"use server";
import db from "@/models";
import ViewCompaniesComponent from "./main";

export default async function ViewCompanyPage() {
  let companies = [];
  let users = [];
  let services = [];
  let errorMsg = null;

  try {
    const companiesData = await db.Company.findAll({
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
    companies = JSON.parse(JSON.stringify(companiesData));

    const usersData = await db.User.findAll({
      attributes: ["id", "name", "email"],
    });
    users = JSON.parse(JSON.stringify(usersData));

    const servicesData = await db.Service.findAll();
    services = JSON.parse(JSON.stringify(servicesData));
  } catch (error) {
    errorMsg = error.message;
  }

  if (errorMsg) {
    return <p className="text-red-500">{errorMsg}</p>;
  }

  return (
    <ViewCompaniesComponent
      companies={companies}
      users={users}
      services={services}
    />
  );
}
