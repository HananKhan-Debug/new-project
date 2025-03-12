module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      name: DataTypes.STRING
    }, {});
  
    Role.associate = function(models) {
      Role.hasMany(models.User, { 
        foreignKey: 'roleId',
        as: 'users' // Alias for the relation
      });
    };
  
    return Role;
    
  };

  