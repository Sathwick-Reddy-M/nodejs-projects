const path = require("path");
const songsModel = require("../models/songs.models");

homeController = {};

const getArtistNames = (req, res) => {
  songsModel
    .getArtists()
    .then((artists) => {
      res.render(path.join(__dirname, "..", "..", "views", "pages", "index"), {
        artists,
      });
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

homeController.getArtistNames = getArtistNames;

module.exports = homeController;
