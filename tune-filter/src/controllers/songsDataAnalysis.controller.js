const { parse } = require("csv-parse");
const fs = require("fs");
const { writeFile } = require("fs/promises");
const path = require("path");

songsDataAnalysisController = {};

const relevantDataObj = {};
const writeFilePath = path.join(__dirname, "..", "..", "relevantData.json");

const updateRelevantData = (data) => {
  const {
    track_artist,
    track_name,
    track_popularity,
    track_album_name,
    track_album_release_date,
    danceability,
  } = data;

  if (!relevantDataObj.hasOwnProperty(track_artist)) {
    relevantDataObj[track_artist] = {
      totalTracks: 1,
      albums: [track_album_name],
      topTrack: track_name,
      topTrackAlbum: track_album_name,
      highestTrackPopularity: track_popularity,
      latestAlbumRelease: track_album_release_date,
      latestAlbum: track_album_name,
      mostDancableTrack: track_name,
      highestTrackDancability: danceability,
    };
    return;
  }

  const artistObj = relevantDataObj[track_artist];
  artistObj["totalTracks"] += 1;
  if (
    !artistObj["albums"].find((album) => {
      return track_album_name === album;
    })
  ) {
    artistObj["albums"].push(track_album_name);
  }
  if (track_popularity > artistObj["highestTrackPopularity"]) {
    artistObj["topTrack"] = track_name;
    artistObj["topTrackAlbum"] = track_album_name;
    artistObj["highestTrackPopularity"] = track_popularity;
  }

  if (track_album_release_date > artistObj["latestAlbumRelease"]) {
    artistObj["latestAlbumRelease"] = track_album_release_date;
    artistObj["latestAlbum"] = track_album_name;
  }

  if (danceability > artistObj["highestTrackDancability"]) {
    artistObj["mostDancableTrack"] = track_name;
    artistObj["highestTrackDancability"] = danceability;
  }
};

async function exportInformation(relevantDataObj) {
  try {
    await writeFile(writeFilePath, JSON.stringify(relevantDataObj));
    console.log(`Exported data to ${writeFilePath}`);
  } catch (error) {
    console.error(error);
  }
}

const getSongsInfoFile = (req, res) => {
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
      updateRelevantData(data);
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("end", async () => {
      await exportInformation(relevantDataObj);
      console.log("done extracting and exporting the relevant information");
      res.download(path.join(__dirname, "..", "..", "relevantData.json"));
    });
};

songsDataAnalysisController.getSongsInfoFile = getSongsInfoFile;

module.exports = songsDataAnalysisController;
