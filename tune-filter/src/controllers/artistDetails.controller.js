const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

artistDetailsController = {};

const updateSongs = (data, artistName, songs) => {
  const { track_artist, track_name, track_popularity } = data;

  if (track_artist.toLowerCase() == artistName) {
    songs.push({ track_name, track_popularity });
  }
};

const getSongsByArtist = (req, res) => {
  const artist = req.params.artist;
  const songs = [];

  fs.createReadStream(
    path.join(__dirname, "..", "..", "archive", "spotify_songs.csv")
  )
    .pipe(
      parse({
        comment: "#",
        columns: true,
        skip_records_with_error: true,
      })
    )
    .on("data", (data) => {
      updateSongs(data, artist.toLowerCase(), songs);
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("end", () => {
      res.json(songs);
    });
};

artistDetailsController.getSongsByArtist = getSongsByArtist;

module.exports = artistDetailsController;
