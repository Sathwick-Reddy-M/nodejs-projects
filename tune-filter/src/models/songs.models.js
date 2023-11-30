const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

function getDataFromCSV(functionToApply, objectRef, others = {}) {
  return new Promise((resolve, reject) => {
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
        functionToApply(data, objectRef, others);
      })
      .on("error", (error) => {
        reject(error);
      })
      .on("end", () => {
        resolve("successfully completed");
      });
  });
}

function getArtists() {
  return new Promise((resolve, reject) => {
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
        reject(error);
      })
      .on("end", () => {
        resolve(artists);
      });
  });
}

module.exports = {
  getDataFromCSV,
  getArtists,
};
