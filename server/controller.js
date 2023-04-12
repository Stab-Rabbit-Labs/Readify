const fetch = require('node-fetch');
const { History } = require('./model');
const db = require('./model.js');

const controller = {};

controller.storeToken = (req, res, next) => {
    const code = req.query.code; // code we receive from spotify to verify, we get it from the get request to /login
    // added authid and authsec from Minzo's dev app
    const authid = '42c01af939954a35a024a9d4aee4b125'; // these two are from app that we made with spotify
    const authsec = '2992ca8cfd3247098408f04889cd5240';
     fetch('https://accounts.spotify.com/api/token', {
        // fetch request tells spotify you have the code now and you send this info
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
                'Basic ' +
                // added base64 of Minzo's app
                'NDJjMDFhZjkzOTk1NGEzNWEwMjRhOWQ0YWVlNGIxMjU6Mjk5MmNhOGNmZDMyNDcwOTg0MDhmMDQ4ODljZDUyNDA=', // this is the base 64 of the authid and authsec with colon in middle
            // 'Authorization': 'Basic ' + btoa(authid + ':' + authsec),
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
            'http://localhost:8080/api/callback'
        )}`, // this is basically the request being sent out
    })
        .then((data) => data.json())
        .then((data) => {
            // save token to controller to have access in other areas.
            controller.token = data.access_token;
            next();
        }); // data will include access token which you can use in subsequent fetch requests to the spotify API
};

// Possibly modularize google books/spotify/db
// GOOGLE BOOKS API
controller.getTitle =  (req, res, next) => {
  const { title } = req.body;
  res.locals.title = title;

  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCXUjqCkxkBUW53n9BRZdQpzmtEb6BwYIk`
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(
        'bookinfo',
        result.items[0].volumeInfo.imageLinks.thumbnail,
        result.items[0].volumeInfo.description
      );
      res.locals.image = result.items[0].volumeInfo.imageLinks.thumbnail;
      res.locals.books = result.items[0].volumeInfo.description
        .split(' ')
        .filter((word) => word.length > 3);
      return next();
    });
};

controller.createPlaylist = (req, res, next) => {
    const token = controller.token;
    console.log('TOKEN FROM CREATE PLAYLIST MIDDLEWARE', token);
    res.locals.token = token;
    // Minzo: need to have your own spotify dev account
    // added 1219159519 as minzo's spotify account
    fetch(`https://api.spotify.com/v1/users/${'1219159519'}/playlists`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: res.locals.title,
            description: '',
            public: false,
        }),
    })
        .then((response) => response.json())
        .then((result) => {
          // console.log('Playlist id from create playlist middleware', result.id);
          res.locals.playlist_id = result.id;
          return next();
    });
};

controller.getRecommendations = (req, res, next) => {
  // ArtistSeed and trackSeed currently hardcoded to have a "starter" playlist.
  const artistSeed = '4NHQUGzhtTLFvgF5SZesLK';
  const trackSeed = '0c6xIDDpzE81m2q797ordA';
  const genreSeed = res.locals.books;
  
  fetch(
    `https://api.spotify.com/v1/recommendations?seed_artists=${artistSeed}&seed_tracks=${trackSeed}&seed_genre${genreSeed.join(
      ','
    )}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${res.locals.token}`,
      },
    }
  )
    .then((data) => data.json())
    .then((data) => {
      // console.log(data.tracks.map((track) => track.uri));
      res.locals.tracks = data.tracks.map((track) => track.uri);
      return next();
    });
};

controller.addTracks = (req, res, next) => {
  fetch(
    `https://api.spotify.com/v1/playlists/${res.locals.playlist_id}/tracks`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${res.locals.token}`,
      },
      body: JSON.stringify({
        uris: res.locals.tracks,
      }),
    }
  ).then((data) => next());
};

//SAVE title and playlist for tracks into SQL DB
controller.saveToDB = (req, res, next) => {
  const arr = [res.locals.title, res.locals.playlist_id, 1];
  const historyCreate =
    'INSERT INTO history (title, playlist_id, user_id) VALUES ($1, $2, $3)';

  db.query(historyCreate, arr)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `controller.saveToDB: ERROR: ${err}`,
        message: {
          err: 'Error occurred in controller.saveToDB. Check server logs for more details.',
        },
      });
    });
};

controller.sendDataBackToFront = (req, res, next) => {
  // ### replace user_id = 1 with variable from current user
  const historySelect = 'SELECT * FROM history WHERE user_id = 1';
  db.query(historySelect)
    .then((data) => {
      res.locals.fromDB = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `controller.sendDataBackToFront: ERROR: ${err}`,
        message: {
          err: 'Error occurred in controller.sendDataBackToFront. Check server logs for more details.',
        },
      });
    });
};


module.exports = controller;
