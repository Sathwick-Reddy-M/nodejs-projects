const express = require("express");
const path = require("path");
const songsDataAnalysisRouter = require("./routes/songsDataAnalysis.router");
const app = express();

app.use(express.json());
app.use("/songDataAnalysis", songsDataAnalysisRouter);

module.exports = app;
