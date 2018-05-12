'use strict';
module.exports = (sequelize, DataTypes) => {
  var Providers = sequelize.define('Providers', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    title: DataType.String,
    notes: DataType.TEXT,
    photoLink: DataType.

  }, {});
  Providers.associate = function(models) {
    // associations can be defined here
  };
  return Providers;
};