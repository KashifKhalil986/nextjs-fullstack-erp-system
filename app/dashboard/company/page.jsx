"use server";

import db from "@/models";
import CreateCompanyComponent from "./main";

export default async function CreateCompanyPage() {
  // get users data for create company form
  const users = await db.User.findAll({
    attributes: ["id", "name", "email"],
    include: [
      {
        model: db.Company,
        as: "Companies",
        attributes: ["id", "email"],
      },
    ],
    raw: true,
    nest: true,
  });
  // structure unique users data
  const uniqueUsers = Object.values(
    users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {}),
  );
  // return create company component
  return <CreateCompanyComponent users={uniqueUsers} />;
}
