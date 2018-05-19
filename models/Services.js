module.exports = function (sequelize, DataTypes)  {
  var Services = sequelize.define('Services', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      field: 'id',
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    }, 

    service_name: {
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
    'created_at': {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    'updated_at': {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    },
  }, {
    timestamps: true,
    tableName: 'services',
    paranoid: true,
    underscored: true,
  });

  Services.associate = function (models) {
    //The services belong to Providers
    //We can not have  a  Service  without having a Provider.

    Services.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Services;
};