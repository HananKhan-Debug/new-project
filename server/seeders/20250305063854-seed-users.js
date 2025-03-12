'use strict';
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10); // Hashing password

    await queryInterface.bulkInsert('users', [
      {
        username: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        roleId: 1, // Assigning Admin Role
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        roleId: 2, // Assigning User Role
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Mike Johnson',
        email: 'mike@example.com',
        password: hashedPassword,
        roleId: 3, // Assigning Manager Role
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
