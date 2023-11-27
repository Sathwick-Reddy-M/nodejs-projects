const express = require("express");
const songsDataAnalysisController = require("../controllers/songsDataAnalysis.controller");

const songsDataAnalysisRouter = express.Router();

songsDataAnalysisRouter.get("/", songsDataAnalysisController.getSongsInfoFile);

module.exports = songsDataAnalysisRouter;
