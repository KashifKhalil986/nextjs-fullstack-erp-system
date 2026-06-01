"use server";

import db from "@/models";
import CreateCompanyComponent from "./main";

export default async function CreateCompanyPage() {
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
  const uniqueUsers = Object.values(
    users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {}),
  );

  return <CreateCompanyComponent users={uniqueUsers} />;
}
