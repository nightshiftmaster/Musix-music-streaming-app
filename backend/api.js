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
  // Поиск песни конкретного артиста по ID песни
  Artist.aggregate([
    // Разбиваем массив topSongs на отдельные элементы
    { $unwind: "$topSongs" },
    { $unwind: "$topSongs" }, // Учитывая, что массив вложен дважды

    // Фильтруем по ID артиста и ID песни
    {
      $match: {
        "topSongs.id": songId, // Замените на ID нужной песни
      },
    },

    // Опционально: можно выбрать только нужные поля
    {
      $project: {
        _id: 0, // Исключить поле _id из результата
        "topSongs.attributes.name": 1, // Имя песни
        "topSongs.attributes.artistName": 1, // Имя артиста
        "topSongs.attributes.artwork.url": 1, // URL обложки
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
