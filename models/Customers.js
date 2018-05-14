module.exports = function (sequelize, DataTypes) {
  var Customers = sequelize.define('Customers', {

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
    tableName: Customers,
    paranoid: true,
    underscored: true,
  });
  Customers.associate = function (models) {
    // Providers has many Services
    Customers.hasMany(models.Appointments, {
      onDelete: "cascade"
    });

  };
  return Customers;
};