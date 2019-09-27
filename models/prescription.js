module.exports = function(sequelize, DataTypes) {
    var Prescription = sequelize.define("Prescription", {
        name: DataTypes.STRING,
        details: DataTypes.STRING,
        image: DataTypes.STRING,
        dosage: DataTypes.STRING,
        dosageUnit: DataTypes.STRING,
        frequency: DataTypes.INTEGER,
        frequencyUnit: DataTypes.STRING,
        comments: DataTypes.STRING ,
      });
  
    Prescription.associate = function(models) {
      Prescription.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }); 

        // Prescription.hasMany(models.Schedule, {
        //   foreignKey: {
        //     allowNull: false
        //   }
        // });
      };

    return Prescription;
  };