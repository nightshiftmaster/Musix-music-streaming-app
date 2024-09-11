const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports =
  mongoose.models.Song || mongoose.model("Song", SongDetailsSchema);
