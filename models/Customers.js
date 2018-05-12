'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customers = sequelize.define('Customers', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    notes: DataTypes.TEXT
 
  }, {});
  Customers.associate = function(models) {
    // associations can be defined here
  };
  return Customers;
};