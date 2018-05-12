'use strict';
module.exports = (sequelize, DataTypes) => {
  var Appointments = sequelize.define('Appointments', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Appointments.associate = function(models) {
    // associations can be defined here
  };
  return Appointments;
};