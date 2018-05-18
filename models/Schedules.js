module.exports = function (sequelize, DataTypes) {
  var Schedules = sequelize.define('Schedules', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      field: 'id',
    },
    startTime: {

      type: DataTypes.DATE,
      allowNull: false,
    },

    endTime: {

      type: DataTypes.DATE,
      allowNull: false,
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
    // Schedules belongs to Providers
    Schedules.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: false
      }
    });

    // Schedules.hasMany(models.Appointments, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    
    Schedules.belongsToMany(models.Providers, {
      as: "Stylist",
      through: 'Appointments'
    });


  };
  return Schedules;
};