module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      
      roleId: DataTypes.INTEGER // Add roleId as a foreign key
    }, {});
  
    User.associate = function(models) {
      User.belongsTo(models.Role, { 
        foreignKey: 'roleId',
        as: 'role' // Alias for the relation
      });
    };
  
    return User;
    
    
  };


  