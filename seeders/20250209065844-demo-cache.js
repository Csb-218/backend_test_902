'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('caches', [

      {
        "key": "1",
        "value": "csb"
      }, {
        "key": "2",
        "value": "csb2"
      },
      {
        "key": "3",
        "value": "csb3"
      },
      {
        "key": "4",
        "value": "csb4"
      },
      {
        "key": "5",
        "value": "csb5"
      },
      {
        "key": "6",
        "value": "csb6"
      },
      {
        "key": "7",
        "value": "csb7"
      },
      {
        "key": "8",
        "value": "csb8"
      }
      , {
        "key": "9",
        "value": "csb9"
      }
      , {
        "key": "10",
        "value": "csb10"
      }

    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('caches', null, {});
  }
};
