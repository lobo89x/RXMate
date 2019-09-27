module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER
    });
  
    User.associate = function(models) {
      User.hasMany(models.Prescription, {
        onDelete: "cascade"
      });
    
        // User.hasMany(models.Schedule, {
        //   onDelete: "cascade"
        // });
      };
  
    return User;
  };
  