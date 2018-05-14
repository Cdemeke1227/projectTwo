'use strict';
module.exports = (sequelize, DataTypes) => {
  var Schedules = sequelize.define('Schedules', {
    weekday: DataTypes.STRING,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    available: DataTypes.BOOLEAN
  }, {});
  Schedules.associate = function(models) {
    // associations can be defined here
  };
  return Schedules;
};