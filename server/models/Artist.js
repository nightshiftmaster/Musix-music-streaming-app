const mongoose = require("mongoose");

// Define the schema for song attributes
const songAttributesSchema = new mongoose.Schema(
  {
    name: String,
    artistName: String,
    artwork: {
      url: String,
    },
    previews: [
      {
        url: String,
      },
    ],
  },
  { _id: false }
);

// Define the schema for a song
const songSchema = new mongoose.Schema(
  {
    id: String,
    attributes: songAttributesSchema,
  },
  { _id: false }
);

// Define the schema for the artist
const artistSchema = new mongoose.Schema({
  id: String,
  avatar: String,
  attributes: {
    artistBio: String,
    genreNames: [String],
    name: String,
  },
  topSongs: [[songSchema]], // Nested array to accommodate the array of arrays
});

// Create the Artist model
const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
