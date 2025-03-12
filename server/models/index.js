const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('employedb', 'root', 'Ab@123456', {
  host: 'localhost',
  dialect: 'mysql', // Change this to 'postgres', 'sqlite', or 'mssql' if needed
  logging: false // Disable logging for cleaner output
});

// Import models
const User = require('./user')(sequelize, DataTypes);
const Role = require('./Role')(sequelize, DataTypes);

// Define associations
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' }); // A user has one role
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' }); // A role has many users

// Export models and Sequelize connection
module.exports = { sequelize, User, Role };
