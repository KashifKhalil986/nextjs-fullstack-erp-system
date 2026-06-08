const db = require('../models/index.js');

async function testConnection() {
  try {
    console.log("Connecting to database...");
    const companies = await db.default.Company.findAll({
      include: [
        {
          model: db.default.User,
          as: "Users",
        },
        {
          model: db.default.Service,
          as: "Services",
        },
      ],
    });
    console.log("Query successful! Companies found:", companies.length);
  } catch (error) {
    console.error("Database connection/query error:", error);
  } finally {
    process.exit();
  }
}

testConnection();
