const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRoutes = require("./api");
const path = require("path");

const PORT = process.env.PORT || 3001;

require("dotenv").config();
const app = express();

mongoose.connect(process.env.MONGO);

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, "../client/dist"))); // Путь к собранным файлам фронтенда

// Маршрут для корневой страницы
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Перенаправление всех других маршрутов (для SPA) на index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server has been started...");
});

module.exports = app;
