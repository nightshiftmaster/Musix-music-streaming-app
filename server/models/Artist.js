const mongoose = require("mongoose");

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

const songSchema = new mongoose.Schema(
  {
    id: String,
    attributes: songAttributesSchema,
  },
  { _id: false }
);

const artistSchema = new mongoose.Schema({
  id: String,
  avatar: String,
  attributes: {
    artistBio: String,
    genreNames: [String],
    name: String,
  },
  topSongs: [[songSchema]],
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
