const express = require("express");
const songsDataAnalysisController = require("../controllers/songsDataAnalysis.controller");

const songsDataAnalysisRouter = express.Router();

songsDataAnalysisRouter.get("/", songsDataAnalysisController.getSongsInfo);
songsDataAnalysisRouter.post(
  "/",
  songsDataAnalysisController.downloadSongsInfoFile
);

module.exports = songsDataAnalysisRouter;
