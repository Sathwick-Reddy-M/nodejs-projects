const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

homeController = {};

const getArtistNames = (req, res) => {
  const artists = [];

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
      const { track_artist } = data;

      if (!artists.includes(track_artist)) {
        artists.push(track_artist);
      }
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("end", () => {
      res.render(path.join(__dirname, "..", "..", "views", "pages", "index"), {
        artists,
      });
    });
};

homeController.getArtistNames = getArtistNames;

module.exports = homeController;
