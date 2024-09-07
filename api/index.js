const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./api"));

// Обслуживание фронтенда
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

module.exports = app;
