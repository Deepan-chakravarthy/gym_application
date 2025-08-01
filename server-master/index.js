const express = require("express");
const cors = require("cors");
const path = require("path");

const exercises = require("./utils/Exercises.json");
const list = require("./utils/Bodypartlist");
const images = require("./utils/ImageService");
const sequelize = require("./config/database");
const Exercise = require("./models/Exercise");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

//status

app.get("/status", (req, res) => {
  res.status(200).send("<h1>Server is Running !!!!!</h1>");
});

// exercises
app.get("/exercises", async (req, res) => {
  const data = await Exercise.findAll();
  res.status(200).json(data);
});


//exercises:id
app.get("/exercises/exercise/:id", async (req, res) => {
  const exercise = await Exercise.findByPk(req.params.id);
  if (exercise) res.status(200).json(exercise);
  else res.status(404).send("Not Found Id");
});

//exercises/target/:target
app.get("/exercises/target/:target", async (req, res) => {
  const data = await Exercise.findAll({ where: { target: req.params.target } });
  if (data.length) res.status(200).json(data);
  else res.status(404).send("Not Found Target");
});

//exercises/equipment/:equipment
app.get("/exercises/equipment/:equipment", async (req, res) => {
  const data = await Exercise.findAll({ where: { equipment: req.params.equipment } });
  if (data.length) res.status(200).json(data);
  else res.status(404).send("Not Found equipment");
});

//bodypartlist
app.get("/exercises/bodyPartList", async (req, res) => {
  try {
    const bodyParts = await Exercise.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("bodyPart")), "bodyPart"]
      ],
      raw: true,
    });

    const bodyPartList = bodyParts.map((item) => item.bodyPart);
    res.status(200).json(bodyPartList);
  } catch (error) {
    console.error("Error fetching body parts:", error);
    res.status(500).send("Internal Server Error");
  }
});

//exercises/bodyPart/:bodyPart
app.get("/exercises/bodyPart/:bodypart", async (req, res) => {
  const data = await Exercise.findAll({ where: { bodyPart: req.params.bodypart } });
  if (data.length) res.status(200).json(data);
  else res.status(404).send("Not Found");
});

//image/:id
app.get("/image", (req, res) => {
  const { exerciseId } = req.query;
  const findImageId = images
    .ImageService()
    .filter((el) => el.id == exerciseId)
    .map((el) => {
      return el.image;
    });

  if (findImageId.length) {
    res.sendFile(findImageId[0]);
  } else {
    const noImage = path.join(__dirname, "./images/no-image-available.png");
    res.sendFile(noImage);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
