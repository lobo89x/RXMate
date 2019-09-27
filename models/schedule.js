module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
        frequency: DataTypes.INTEGER,
        frequencyUnit: DataTypes.STRING,
        comments: DataTypes.STRING ,
        prescriptionid: DataTypes.INTEGER, 
        userid:DataTypes.INTEGER       
    });
  
    // RXSched.associate = function(models) {
    //     RXSched.belongsTo(models.USERS, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
  
    // Schedule.associate = function(models) {
    //     Schedule.belongsTo(models.User, {
    //       foreignKey: {
    //         allowNull: false
    //       }
    //     });

    //   };

    return Schedule;
  };