# Readify

The project consists of a web application that allows users to search for books and create personalized Spotify playlists based on the searched book's genre.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Description

The project is divided into a client-side and server-side application.

### Client-side

The client-side application is built using React and allows users to search for books and view their search history. It provides the following components:

- `BookEntryCard.jsx`: Renders a card for a book entry, displaying the book's title, description, and image.
- `Header.jsx`: Renders the application header.
- `PlayerCard.jsx`: Renders a card for the Spotify player, allowing users to play the created playlists.
- `UserHistoryItem.jsx`: Renders an item in the user's search history, displaying the book's title and image.
- `MainContainer.jsx`: Acts as the main container component, managing the state and handling user interactions.
- `UserHistoryContainer.jsx`: Renders the user's search history.
- `App.jsx`: The root component of the application, handling the overall layout and routing.
- `index.html`: The HTML template for the application.
- `index.js`: The entry point of the client-side application.

### Server-side

The server-side application is built using Express.js and interacts with external APIs (Google Books API and Spotify API) to fetch book and music data. It provides the following files:

- `server.js`: The main server file that sets up the Express server and defines the server routes.
- `router.js`: Defines the server routes and their corresponding handlers.
- `model.js`: Contains the database configuration and query functions for interacting with the database.
- `spotifyController.js`: Handles the authentication with Spotify, playlist creation, and track recommendations.
- `dbController.js`: Handles saving search history to the database and retrieving it.
- `bookController.js`: Handles fetching book data from the Google Books API.

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install the dependencies for the client-side application:
   ```shell
   cd client
   npm install
   ```
4. Install the dependencies for the server-side application:
   ```shell
   cd ../server
   npm install
   ```
5. Start the server:
   ```shell
   npm start
   ```
6. Start the client-side application (in a separate terminal):
   ```shell
   cd ../client
   npm start
   ```
7. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. Enter a book title in the search input field.
2. Click the "Search" button to search for the book.
3. The search results will be displayed as cards. Click on a card to view more details about the book.
4. A Spotify playlist based on the book's genre will be created automatically.
5. Use the Spotify player card to play the created playlist.
6. The search history will be displayed in the user's search history section.

## API Endpoints

The server exposes the following API endpoints:

- `GET /`: Retrieves the main HTML page.
- `GET /dist/bundle.js`: Retrieves the bundled JavaScript file.
- `POST /api/get-title`: Handles the book search request, creates

 a Spotify playlist, and saves the search history to the database.
- `GET /api/callback`: Handles the Spotify authentication callback.

## Technologies

- React
- Express.js
- Node.js
- PostgreSQL
- Spotify API
- Google Books API

## Contributing

Contributions to the project are welcome! If you find any issues or would like to propose enhancements, please submit a pull request.

## License

[MIT License](LICENSE)
