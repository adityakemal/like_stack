'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined where
    // User.hasMany(models.Todo,{foreignKey:"userId"})

    User.hasMany(models.Quest,{foreignKey:"userId"})
  };
  return User;
};
