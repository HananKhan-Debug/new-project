'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      { id: 1, name: 'Admin', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'User', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Manager', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
