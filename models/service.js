"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsToMany(models.Company, {
        through: "CompanyServices",
        foreignKey: "serviceId",
        otherKey: "companyId",
        as: "Companies",
      });
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      public_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Service",
    },
  );
  return Service;
};
