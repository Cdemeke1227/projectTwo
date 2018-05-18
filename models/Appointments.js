// var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var Appointments = sequelize.define('Appointments', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      field: 'id',
    },
    appointStart: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      }

    },
    appointEnd: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      }
    },

    duration: {
      type: DataTypes.TIME,
      validate: {
        isDate: true,
      }

    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: Appointments,
    paranoid: true,
    underscored: true,
  });
  Appointments.associate = models => {
      Appointments.belongsTo(models.Customers,{
        foreignKey : {
          allowNull : false
        }
      });
      Appointments.belongsTo(models.Providers,{
        foreignKey : {
          allowNull : false
        }
      });      
      Appointments.belongsTo(models.Schedules,{
        foreignKey : {
          allowNull : false
        }
      });
      };
  return Appointments;
 
};