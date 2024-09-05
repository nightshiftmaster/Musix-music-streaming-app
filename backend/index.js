const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

const app = express();
mongoose.connect(
  "mongodb+srv://nightshiftmaster:Vlad19820708@cluster0.lrcjkhf.mongodb.net/musix_db?retryWrites=true&w=majority"
);

app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./api"));

app.listen(PORT, () => {
  console.log("Server has been started...");
});
