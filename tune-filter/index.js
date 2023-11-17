const { parse } = require("csv-parse");
const fs = require("fs");

const info_obj = {};

const updateRelevantData = (data) => {
  const {
    track_artist,
    track_name,
    track_popularity,
    track_album_name,
    track_album_release_date,
    danceability,
  } = data;

  if (!info_obj.hasOwnProperty(track_artist)) {
    info_obj[track_artist] = {
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

  const artistObj = info_obj[track_artist];
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

fs.createReadStream("./archive/spotify_songs.csv")
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
  .on("end", () => {
    console.log("Done");
  });
