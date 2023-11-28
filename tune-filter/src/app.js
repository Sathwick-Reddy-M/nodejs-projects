const express = require("express");
const path = require("path");
const songsDataAnalysisRouter = require("./routes/songsDataAnalysis.router");
const artistDetailsRouter = require("./routes/artistDetails.router");
const app = express();

app.use(express.json());
app.use("/songsDataAnalysis", songsDataAnalysisRouter);
app.use("/", artistDetailsRouter);
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
