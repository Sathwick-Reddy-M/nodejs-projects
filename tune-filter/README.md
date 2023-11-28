# [Songs API](https://replit.com/@Sathwick/Songs-API)

This Node.js project processes music track data from a Spotify CSV file. It efficiently parses CSV data to extract relevant information about tracks and organizes it by artist. Additionally, it offers an RESTful API with [endpoints](#api-endpoints) for viewing and downloading this data, as well as for retrieving artist-specific information such as songs, playlists, and albums. Utilizing EJS templates for server-side rendering and following the MVC architecture, the project ensures efficient code organization and maintainability.

Checkout the server [here](https://replit.com/@Sathwick/Songs-API).

## Installation

Before running this project, ensure you have Node.js installed. After installing Node.js, clone or download this project and navigate to the project directory. Install the necessary dependencies with the following command

```
npm install
```

## Usage

To run the project, use the following command in the project `src` directory:

```
node server.js
```

The script expects a CSV file named spotify_songs.csv in an archive directory within the project folder. Ensure this file is present before running the script.

## Key Features

- **CSV Data Parsing**: Efficiently extracts track information from the CSV file.
- **Data Aggregation**: Organizes data by artist, detailing total tracks, album names, most popular tracks, and more.
- **Data Export**: Outputs aggregated data to a JSON file named `relevantData.json`.
- **API Functionality**:
  - **View and Download Data**: Use `/songsDataAnalysis` to view or download the JSON file.
  - **Artist-Specific Data Retrieval**: Access songs (`/songs/:artist`), playlists (`/playlists/:artist`), and albums (`/albums/:artist`) for individual artists.
- **Server-Side Rendering**: Utilizes EJS templates for dynamic content rendering.
- **MVC Architecture**: Adopts the Model-View-Controller pattern for efficient code organization and maintainability.

## API Endpoints

- **`/` (Home Page)**: Lists all available endpoints with descriptions along with the available artist names.
- **`/songsDataAnalysis`**:
  - `GET`: Displays the songs data analysis.
  - `POST`: Downloads the song data analysis JSON file.
- **`/songs/:artist`**: Shows songs by a specified artist.
- **`/playlists/:artist`**: Lists playlists associated with a specific artist.
- **`/albums/:artist`**: Displays albums by a given artist.

## Data Source

The data for this project is sourced from a Kaggle dataset "30,000 Spotify Songs". This dataset can be accessed and downloaded from [Kaggle](https://www.kaggle.com/datasets/joebeachcapital/30000-spotify-songs/).
