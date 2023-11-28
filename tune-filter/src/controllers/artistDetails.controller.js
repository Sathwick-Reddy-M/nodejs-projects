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
      res.render(
        path.join(__dirname, "..", "..", "views", "pages", "artistSongs"),
        {
          songs,
          artist,
        }
      );
    });
};

artistDetailsController.getSongsByArtist = getSongsByArtist;

const updatePlaylists = (data, artistName, playlists, uniquePlaylistNames) => {
  const { track_artist, playlist_name, playlist_genre, playlist_subgenre } =
    data;

  if (
    track_artist.toLowerCase() == artistName &&
    !uniquePlaylistNames.includes(playlist_name)
  ) {
    playlists.push({ playlist_name, playlist_genre, playlist_subgenre });
    uniquePlaylistNames.push(playlist_name);
  }
};

const getPlaylistsByArtist = (req, res) => {
  const artist = req.params.artist;
  const playlists = [];
  const uniquePlaylistNames = [];

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
      updatePlaylists(
        data,
        artist.toLowerCase(),
        playlists,
        uniquePlaylistNames
      );
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("end", () => {
      res.render(
        path.join(__dirname, "..", "..", "views", "pages", "artistPlaylists"),
        {
          playlists,
          artist,
        }
      );
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
      res.render(
        path.join(__dirname, "..", "..", "views", "pages", "artistAlbums"),
        {
          albums,
          artist,
        }
      );
    });
};

artistDetailsController.getAlbumsByArtist = getAlbumsByArtist;

module.exports = artistDetailsController;
