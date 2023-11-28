const express = require("express");
const artistDetailsController = require("../controllers/artistDetails.controller");

const artistDetailsRouter = express.Router();

artistDetailsRouter.get(
  "/songs/:artist",
  artistDetailsController.getSongsByArtist
);

artistDetailsRouter.get(
  "/playlists/:artist",
  artistDetailsController.getPlaylistsByArtist
);

artistDetailsRouter.get(
  "/albums/:artist",
  artistDetailsController.getAlbumsByArtist
);

module.exports = artistDetailsRouter;
