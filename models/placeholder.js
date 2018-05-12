module.exports = function(sequelize, DataTypes){
    var Placeholder = sequelize.define("Placeholder", {
        placeholder: {
            type: DataTypes.STRING
        }
    });

    return Placeholder;
};