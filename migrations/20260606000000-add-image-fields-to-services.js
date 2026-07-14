'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Services', 'image', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Services', 'public_id', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Services', 'image');
    await queryInterface.removeColumn('Services', 'public_id');
  }
};
