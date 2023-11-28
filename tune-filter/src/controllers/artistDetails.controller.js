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

const updatePlaylists = (data, artistName, playlists) => {
  const { track_artist, playlist_name, playlist_genre, playlist_subgenre } =
    data;

  if (track_artist.toLowerCase() == artistName) {
    playlists.push({ playlist_name, playlist_genre, playlist_subgenre });
  }
};

const getPlaylistsByArtist = (req, res) => {
  const artist = req.params.artist;
  const playlists = [];

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
      updatePlaylists(data, artist.toLowerCase(), playlists);
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("end", () => {
      res.json(playlists);
    });
};

artistDetailsController.getPlaylistsByArtist = getPlaylistsByArtist;

const updateAlbums = (data, artistName, albums) => {
  const { track_artist, track_album_name } = data;

  if (track_artist.toLowerCase() == artistName) {
    albums.push({ track_album_name });
  }
};

const getAlbumsByArtist = (req, res) => {
  const artist = req.params.artist;
  const albums = [];

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
      updateAlbums(data, artist.toLowerCase(), albums);
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("end", () => {
      res.json(albums);
    });
};

artistDetailsController.getAlbumsByArtist = getAlbumsByArtist;

module.exports = artistDetailsController;
