import db from "@/models";
import ServicesPage from "./main";

export default async function ViewServicePage() {
  try {
    const services = await db.Service.findAll({
      include: [
        {
          model: db.Company,
          as: "Companies",
          through: { attributes: [] },
        },
      ],
    });

    const serviceData = JSON.parse(JSON.stringify(services));

    return <ServicesPage serviceData={serviceData} />;
  } catch (error) {
    console.log(error);

    return (
      <div className="text-center text-red-500">Failed to load services</div>
    );
  }
}
