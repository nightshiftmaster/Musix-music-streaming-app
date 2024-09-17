process.env.PORT = 3002;
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const supertest = require("supertest");
const assert = require("assert");
const app = require("./index.js");
const Artist = require("./models/Artist");
const Song = require("./models/Song");

const artist = new Artist({
  id: "12345",
  avatar: "http://example.com/avatar.jpg",
  attributes: {
    artistBio: "This is a bio for the artist.",
    genreNames: ["Rock", "Pop"],
    name: "Artist Name",
  },
  topSongs: [
    [
      {
        id: "song1",
        attributes: {
          name: "Song Name 1",
          artistName: "Artist Name",
          artwork: {
            url: "http://example.com/song1.jpg",
          },
          previews: [
            {
              url: "http://example.com/song1-preview.mp3",
            },
          ],
        },
      },
    ],
    [
      {
        id: "song2",
        attributes: {
          name: "Song Name 2",
          artistName: "Artist Name",
          artwork: {
            url: "http://example.com/song2.jpg",
          },
          previews: [
            {
              url: "http://example.com/song2-preview.mp3",
            },
          ],
        },
      },
    ],
  ],
});

const song = new Song({
  id: "1736051619",
  attributes: {
    name: "Beautiful Things",
    artistName: "Benson Boone",
    artwork: {
      url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a5/c1/9c/a5c19c62-d641-93b4-2800-e74778569f5f/093624852483.jpg/440x440bb.jpg",
    },
    previews: [
      {
        url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/68/48/a4/6848a498-05bd-6428-908c-d647a5e2c497/mzaf_13654407929449846984.plus.aac.p.m4a",
      },
    ],
  },
  relationships: {
    artists: {
      href: "/v1/catalog/dz/songs/1736051619/artists?l=en-GB",
      data: [
        {
          id: "1587414058",
          type: "artists",
          href: "/v1/catalog/dz/artists/1587414058?l=en-GB",
        },
      ],
    },
  },
  style: "POP",
  lyrics: [],
  artists: [
    {
      id: "1587414058",
      attributes: {
        name: "Benson Boone",
      },
      type: "artists",
    },
  ],
});

let mongoServer;

before(async function () {
  this.timeout(10000);
  await mongoose.connection.close();

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async function () {
  this.timeout(10000);
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
});

// beforeEach(async function () {
//   await Song.deleteMany({});
// });

describe("API Routes", function () {
  it("should get song by style", async function () {
    await song.save();
    const response = await supertest(app).get("/api/songs/genre?style=POP");
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 1);
    assert.strictEqual(response.body[0].attributes.artistName, "Benson Boone");
  });

  it("should get artist by id", async function () {
    await artist.save();
    const response = await supertest(app).get("/api/artists/id/12345");
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 1);
    assert.strictEqual(response.body[0].attributes.name, "Artist Name");
  });

  it("should get song by id", async function () {
    const response = await supertest(app).get("/api/songs/1736051619");
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 1);
    assert.strictEqual(response.body[0].attributes.artistName, "Benson Boone");
  });

  it("should get artist by name", async function () {
    const response = await supertest(app).get("/api/artists/name/Artist Name");
    assert.strictEqual(response.status, 200);
    assert.strictEqual([response.body][0].attributes.name, "Artist Name");
  });

  it("should get artist by query", async function () {
    const response = await supertest(app).get("/api/artists").query({ q: "A" });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 1);
    assert.strictEqual(response.body[0].attributes.name, "Artist Name");
  });
});
