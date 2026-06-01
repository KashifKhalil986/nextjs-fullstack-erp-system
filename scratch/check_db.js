import db from "../models/index.js";

async function verifyQuery() {
  try {
    console.log("Attempting to run the exact Sequelize query from /api/company...");
    const companies = await db.Company.findAll({
      include: [
        {
          model: db.User,
          as: "Users",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
        {
          model: db.User,
          as: "owner",
          attributes: ["id", "name", "email"],
        },
        {
          model: db.Service,
          as: "Services",
          attributes: ["id", "name", "description"],
          through: { attributes: [] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log("SUCCESS! Query ran perfectly.");
    console.log(`Fetched ${companies.length} companies.`);
    console.log("Sample company record:", JSON.stringify(companies[0] || "No companies in table yet", null, 2));
  } catch (error) {
    console.error("FAILURE! The query failed with error:", error);
  } finally {
    await db.sequelize.close();
  }
}

verifyQuery();
