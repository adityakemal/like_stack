'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quest = sequelize.define('Quest', {
    userId: DataTypes.INTEGER,
    question: DataTypes.STRING
  }, {});
  Quest.associate = function(models) {
    // associations can be defined here
    Quest.belongsTo(models.User,{foreignKey:'userId'})
    Quest.hasMany(models.Answer,{foreignKey:'questId'})
  };
  return Quest;
};
