// var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var Appointments = sequelize.define('Appointments', {

    customer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    },
    stylist: {
       type: DataTypes.STRING,
      allowNull: false,
       validate: {
         len: [1, 160]
       }
     },
     date: {
       type: DataTypes.DATE,
     defaultValue: DataTypes.NOW,
     validate: {
      isDate: true, 
     }

     },
    start_time: {
      type: DataTypes.TIME,
      validate: {
        isDate: true, 
       }
    }, 

    duration: {
      type: DataTypes.TIME,
      validate: {
        isDate: true, 
       }

    }

  });
  Appointments.associate = function (models) {
    // associations can be defined here
    Appointments.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: false
      }
    });

    Appointments.belongsTo(models.Customers, {
      foreignKey: {
        allowNull: false
      }
    });

    Appointments.belongsTo(models.Schedules, {
      foreignKey: {
        allowNull: false
      }
    });

  };
  return Appointments;
};