module.exports = function (sequelize, DataTypes) {
  var Providers = sequelize.define('Providers', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    experience: {
      type: DataTypes.INTEGER, // We need to convert the years inserted by the user to months
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Employee'
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    photoLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        // Need to make sure it's a link
      }
    },
    'createdAt': {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    'updatedAt': {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    },
  }, {
    timestamps: true,
    tableName: 'providers',
    paranoid: true,
    // underscored: true,
    
  });
  
  Providers.associate = function(models) {

        // Associating Providers with Services
    // When a Provider  is deleted, also delete any associated Services
    Providers.hasMany(models.Services, {
      // as: 'provider_id',
      onDelete: "cascade"
    });
    
    // Providers.belongsToMany(models.Schedules, {
    //   as: "Reserved Time",
    //   through: 'Appointments'
    // });
    

  };
  return Providers;
};
