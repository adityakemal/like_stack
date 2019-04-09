'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: DataTypes.STRING,
    questId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User,{foreignKey:'userId'})
    Answer.belongsTo(models.Quest,{foreignKey:'questId'})
  };
  return Answer;
};
