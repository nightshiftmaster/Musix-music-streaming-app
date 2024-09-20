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

// app.get("/", (req, res) => {
//   res.redirect("/api");
// });

app.listen(PORT, () => {
  console.log("Server has been started...");
});

module.exports = app;
