const express = require("express");
const path = require("path");
const songsDataAnalysisRouter = require("./routes/songsDataAnalysis.router");
const artistDetailsRouter = require("./routes/artistDetails.router");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use("/songsDataAnalysis", songsDataAnalysisRouter);
app.use("/", artistDetailsRouter);
app.use("/", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "pages", "index"));
});

module.exports = app;
