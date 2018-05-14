'use strict';
module.exports = (sequelize, DataTypes) => {
  var Providers = sequelize.define('Providers', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    experience: DataTypes.DECIMAL,
    phone: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    photoLink: DataTypes.STRING

  }, {});
  Providers.associate = function(models) {
    // associations can be defined here
  };
  return Providers;
};