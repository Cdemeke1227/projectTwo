'use strict';
module.exports = (sequelize, DataTypes) => {
  var Services = sequelize.define('Services', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.TIME,
    price: DataTypes.DECIMAL,
    photolinks: DataTypes.STRING
  }, {});
  Services.associate = function(models) {
    // associations can be defined here
  };
  return Services;
};