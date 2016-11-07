'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tasks = sequelize.define('Tasks', {
    task: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tasks;
};