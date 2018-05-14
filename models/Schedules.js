module.exports = function (sequelize, DataTypes) {
  var Schedules = sequelize.define('Schedules', {

    weekday: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 10],
      }
    },

    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    available: {

      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: true,
      }
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
    tableName: Schedules,
    paranoid: true,
    underscored: true,

  });
  Schedules.associate = function (models) {
    // associations can be defined here
    Schedules.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: false
      }
    });

    Schedules.hasMany(models.Appointments, {
      foreignKey: {
        allowNull: false
      }
    });


  };
  return Schedules;
};