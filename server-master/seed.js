// const sequelize = require("./config/database");
// const Exercise = require("./models/Exercise");
// const data = require("./utils/Exercises.json");

// const seed = async () => {
//   try {
//     await sequelize.sync({ force: true }); // Warning: This will drop and recreate the table
//     await Exercise.bulkCreate(data);
//     console.log("Seeded successfully");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//   }
// };

// seed();
