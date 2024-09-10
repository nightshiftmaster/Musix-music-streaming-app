const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = "3001";
// const path = require("path");
const apiRoutes = require("./api");

require("dotenv").config();
const app = express();

mongoose.connect(process.env.MONGO);

// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.redirect("/api");
});

// app.get("/", (req, res) => {
//   res.send("Server is running on root route");
// });

// app.use("/", (req, res) => res.send("server is running"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(5000, () => {
  console.log("Server has been started...");
});

module.exports = app;
