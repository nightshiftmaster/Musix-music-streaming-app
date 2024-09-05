const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the song details
const SongDetailsSchema = new Schema({
  style: { type: String, required: true },
  id: { type: String, required: true },
  attributes: {
    name: { type: String, required: true },
    artistName: { type: String, required: true },
    artwork: {
      url: { type: String, required: true },
    },
    previews: [
      {
        url: { type: String, required: true },
      },
    ],
  },
  relationships: {
    artists: {
      href: { type: String, required: true },
      data: [
        {
          id: { type: String, required: true },
          type: { type: String, required: true },
          href: { type: String, required: true },
        },
      ],
    },
  },
  artists: [
    {
      id: { type: String, required: true },
      attributes: {
        name: { type: String, required: true },
      },
      type: { type: String, required: true },
    },
  ],
  lyrics: [{ type: String }],
});

// Create a model from the schema

module.exports =
  mongoose.models.Song || mongoose.model("Song", SongDetailsSchema);
