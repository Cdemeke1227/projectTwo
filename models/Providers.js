module.exports = function (sequelize, DataTypes) {
  var Providers = sequelize.define('Providers', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      field: 'id',
    },

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
      allowNull: true,
      // validate: {
      //   isNumeric: true,
      //   // len: [2,11] // How can I make it appear in Phone Number Format (713) 624-2353
      // }
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

    service: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        // Need to make sure it's a link
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
    tableName: 'providers',
    paranoid: true,
    underscored: true,
    
  });
  
  Providers.associate = function(models) {

        // Associating Providers with Services
    // When a Provider  is deleted, also delete any associated Services
    Providers.hasMany(models.Services, {
      onDelete: "cascade"
    });
    
    // Providers.hasMany(models.Schedules, {
    //   onDelete: "cascade"
    // });

    //I dont see where providers belonging to customers would be useful information to gather.
    Providers.belongsToMany(models.Schedules, {
      as: "Reserved Time",
      through: 'Appointments'
    });
    

  };
  return Providers;
};

// // Associating Providers with Services
//     // When a Provider  is deleted, also delete any associated Services
//     Providers.hasMany(models.Services, {
//       onDelete: "cascade"
//     });
    
//     Providers.hasMany(models.Schedules, {
//       onDelete: "cascade"
//     });

//     Providers.hasMany(models.Appointments,{

//     })
//     Providers.belongsTo(models.Schedules, {
//       through: 'Appointments',
//       as: "Reserved Time",
  
//     });

//     //I dont see where providers belonging to customers would be useful information to gather.
//     // Providers.belongsToMany(models.Customers, {through: 'Appointments'});