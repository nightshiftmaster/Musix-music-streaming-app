const express = require("express");
const router = express.Router();
const Song = require("./models/Song");
const Artist = require("./models/Artist");

// router.post("/songs", (req, res) => {
//   Song.insertMany(req.body).then((song) => res.send(song));
// });

// router.post("/artists", (req, res) => {
//   Artist.create(req.body).then((artist) => res.send(artist));
// });

router.get("/artists/topsongs/:songId", (req, res) => {
  const songId = req.params.songId;
  Artist.aggregate([
    { $unwind: "$topSongs" },
    { $unwind: "$topSongs" },

    {
      $match: {
        "topSongs.id": songId,
      },
    },

    {
      $project: {
        _id: 0,
        "topSongs.attributes.name": 1,
        "topSongs.attributes.artistName": 1,
        "topSongs.attributes.artwork.url": 1,
      },
    },
  ])
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error:", err);
    });
});

router.get("/songs/genre", (req, res) => {
  const { style } = req.query;
  Song.find({ style: style })
    .then((songs) => res.json(songs))
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch songs" });
    });
});

router.get("/artists", (req, res) => {
  const searchParams = req.query.q;
  Artist.find({
    "attributes.name": { $regex: `^${searchParams}`, $options: "i" },
  })
    .exec()
    .then((artist) => res.json(artist))
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch artist" });
    });
});

router.get("/artists/name/:name", (req, res) => {
  const artistName = req.params.name;

  Artist.findOne({
    "attributes.name": artistName,
  })

    .then((artist) => res.json(artist))
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch artist" });
    });
});

router.get("/artists/id/:id", (req, res) => {
  Artist.find({ id: req.params.id })
    .then((artist) => res.json(artist))
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch artist" });
    });
});

router.get("/songs/:id", (req, res) => {
  Song.find({ id: req.params.id })
    .then((songs) => res.json(songs))
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch songs" });
    });
});

module.exports = router;
