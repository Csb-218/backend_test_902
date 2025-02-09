'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('caches', {
      key: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      value: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('caches');
  }
};