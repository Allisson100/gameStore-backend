require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mainController = require("./controllers/index");

const app = express();
const PORT = process.env.PORT || 3031;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Running",
    version: "0.0.0",
  });
});

app.use(mainController);

app.listen(PORT, () => {
  console.log("Server Running");
});
