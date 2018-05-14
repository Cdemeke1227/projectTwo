module.exports = (sequelize, DataTypes) => {
  var Services = sequelize.define('Services', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    duration: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL, // We need it to show a Dollar Sign on the webpage
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
   
    photolinks: {
      type: DataTypes.STRING, // We need t ohave data type array here since we are going to have many links to images. (Ask DAN!)
      allowNull: true,

    },
  }, {});
  Services.associate = function(models) {
    // Services Belongs to Providers
    Services.belongsTo(models.Providers, {foreignKey: 'providersId'});
  };
  return Services;
};