module.exports = function (sequelize, DataTypes) {
  var Customers = sequelize.define('Customers', {
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

    username: {
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

    phone: {
      type: DataTypes.INTEGER,
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


    // timestamps: false



  });
  Customers.associate = function (models) {
    // Providers has many Services
    Customers.hasMany(models.Appointments, {
      onDelete: "cascade"
    });
    
  };
  return Customers;
};