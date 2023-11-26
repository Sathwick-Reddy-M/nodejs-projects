# Music Track Analysis

## Description

This Node.js project processes and analyzes music track data from a Spotify CSV file. It parses CSV data to extract relevant information about tracks and organizes it by artist. The final output is a JSON file containing aggregated data for each artist, such as total tracks, albums, and various track attributes.

## Installation

Before running this project, ensure you have Node.js installed. After installing Node.js, clone or download this project and navigate to the project directory. Install the necessary dependencies with the following command

```
npm install
```

## Usage

To run the project, use the following command in the project directory:

```
node index.js
```

The script expects a CSV file named spotify_songs.csv in an archive directory within the project folder. Ensure this file is present before running the script.

## Data Source

The data for this project is sourced from a Kaggle dataset "30,000 Spotify Songs". This dataset can be accessed and downloaded from Kaggle. It includes detailed information on 30,000 Spotify songs.

## Features

1. Parses a CSV file to extract track information.
2. Aggregates data by artist, including total tracks, album names, most popular track, and more.
3. Exports the aggregated data to a JSON file named `relevantData.json`.
