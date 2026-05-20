import db from "@/models";

const syncDB = async () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

export default syncDB;