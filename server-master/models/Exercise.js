const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Exercise = sequelize.define("Exercise", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  bodyPart: DataTypes.STRING,
  equipment: DataTypes.STRING,
  name: DataTypes.STRING,
  target: DataTypes.STRING,
  secondaryMuscles: {
    type: DataTypes.JSON,
  },
  instructions: {
    type: DataTypes.JSON,
  },
  description: DataTypes.TEXT,
  difficulty: DataTypes.STRING,
  category: DataTypes.STRING,
}, {
  timestamps: false,
  tableName: "exercises", // your actual table name
});

module.exports = Exercise;
