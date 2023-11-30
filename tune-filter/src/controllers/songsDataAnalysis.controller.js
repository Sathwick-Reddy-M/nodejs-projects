const { writeFile } = require("fs/promises");
const path = require("path");
const songsModel = require("../models/songs.models");

songsDataAnalysisController = {};

const relevantDataObj = {};
const writeFilePath = path.join(__dirname, "..", "..", "relevantData.json");

const updateRelevantData = (data, relevantDataObj) => {
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

const downloadSongsInfoFile = (req, res) => {
  songsModel
    .getDataFromCSV(updateRelevantData, relevantDataObj)
    .then(async () => {
      await exportInformation(relevantDataObj);
      console.log("done extracting and exporting the relevant information");
      res.download(path.join(__dirname, "..", "..", "relevantData.json"));
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

const getSongsInfo = (req, res) => {
  songsModel
    .getDataFromCSV(updateRelevantData, relevantDataObj)
    .then(() => {
      res.render(
        path.join(__dirname, "..", "..", "views", "pages", "songsDataAnalysis"),
        {
          relevantDataObj,
        }
      );
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

songsDataAnalysisController.downloadSongsInfoFile = downloadSongsInfoFile;
songsDataAnalysisController.getSongsInfo = getSongsInfo;

module.exports = songsDataAnalysisController;
