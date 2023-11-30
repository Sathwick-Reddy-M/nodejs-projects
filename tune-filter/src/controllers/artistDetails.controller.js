const path = require("path");
const songsModel = require("../models/songs.models");

artistDetailsController = {};

const updateSongs = (data, songs, others) => {
  const { track_artist, track_name, track_popularity } = data;
  if (track_artist.toLowerCase() == others.artistName) {
    songs.push({ track_name, track_popularity });
  }
};

const getSongsByArtist = (req, res) => {
  const artist = req.params.artist;
  const songs = [];
  songsModel
    .getDataFromCSV(updateSongs, songs, { artistName: artist.toLowerCase() })
    .then(() => {
      res.render(
        path.join(__dirname, "..", "..", "views", "pages", "artistSongs"),
        {
          songs,
          artist,
        }
      );
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

artistDetailsController.getSongsByArtist = getSongsByArtist;

const updatePlaylists = (data, playlists, others) => {
  const { track_artist, playlist_name, playlist_genre, playlist_subgenre } =
    data;

  if (
    track_artist.toLowerCase() == others.artistName &&
    !others.uniquePlaylistNames.includes(playlist_name)
  ) {
    playlists.push({ playlist_name, playlist_genre, playlist_subgenre });
    others.uniquePlaylistNames.push(playlist_name);
  }
};

const getPlaylistsByArtist = (req, res) => {
  const artist = req.params.artist;
  const playlists = [];
  const uniquePlaylistNames = [];

  songsModel
    .getDataFromCSV(updatePlaylists, playlists, {
      artistName: artist.toLowerCase(),
      uniquePlaylistNames,
    })
    .then(() => {
      res.render(
        path.join(__dirname, "..", "..", "views", "pages", "artistPlaylists"),
        {
          playlists,
          artist,
        }
      );
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

artistDetailsController.getPlaylistsByArtist = getPlaylistsByArtist;

const updateAlbums = (data, albums, others) => {
  const { track_artist, track_album_name } = data;

  if (track_artist.toLowerCase() == others.artistName) {
    albums.push({ track_album_name });
  }
};

const getAlbumsByArtist = (req, res) => {
  const artist = req.params.artist;
  const albums = [];

  songsModel
    .getDataFromCSV(updateAlbums, albums, {
      artistName: artist.toLowerCase(),
    })
    .then(() => {
      res.render(
        path.join(__dirname, "..", "..", "views", "pages", "artistAlbums"),
        {
          albums,
          artist,
        }
      );
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

artistDetailsController.getAlbumsByArtist = getAlbumsByArtist;

module.exports = artistDetailsController;
