'use strict';
module.exports = (sequelize, DataTypes) => {
  var Appointments = sequelize.define('Appointments', {
    customer: DataTypes.STRING,
    stylist: DataTypes.STRING,
    date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    duration: DataTypes.TIME

  }, {});
  Appointments.associate = function(models) {
    // associations can be defined here
  };
  return Appointments;
};