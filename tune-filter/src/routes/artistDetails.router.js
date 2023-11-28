const express = require("express");
const artistDetailsController = require("../controllers/artistDetails.controller");

const artistDetailsRouter = express.Router();

artistDetailsRouter.get(
  "/songs/:artist",
  artistDetailsController.getSongsByArtist
);

module.exports = artistDetailsRouter;
