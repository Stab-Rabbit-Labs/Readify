const fetch = require('node-fetch');
const { Mongoose, model } = require('mongoose');
const { History } = require('./model');
const ObjectId = require('mongodb').ObjectId;
const { Buffer } = require('buffer');
const db = require('./model.js');

const controller = {};

controller.storeToken = async (req, res, next) => {
  console.log('made it to storeToken');
  const code = req.query.code; // code we receive from spotify to verify, we get it from the get request to /login
  // added authid and authsec from Minzo's dev app
  const authid = '42c01af939954a35a024a9d4aee4b125'; // these two are from app that we made with spotify
  const authsec = '2992ca8cfd3247098408f04889cd5240';
  await fetch('https://accounts.spotify.com/api/token', {
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
      'http://localhost:3000/api/callback'
    )}`, // this is basically the request being sent out
  })
    .then((data) => data.json())
    .then((data) => {
      console.log('this is the access token', data.access_token);
      // this doesn't actually do anything
      res.locals.token = data.access_token;
      controller.token = data.access_token;
      next();
    }); // data will include access token which you can use in subsequent fetch requests to the spotify API
};
// Minzo: they also have a getToken that they've commented out. Will need to create a getToken middleware function
//        Possibly modularize google books/spotify/db
// GOOGLE BOOKS API
controller.getTitle = async (req, res, next) => {
  //console.log(req.body);
  const { title } = req.body;
  res.locals.title = title;

  await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCXUjqCkxkBUW53n9BRZdQpzmtEb6BwYIk`
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(
        'bookinfo',
        result.items[0].volumeInfo.imageLinks.thumbnail,
        result.items[0].volumeInfo.description
      );
      //res.locals.bookInfo = result.items[0].volumeInfo.categories[0]
      res.locals.image = result.items[0].volumeInfo.imageLinks.thumbnail;
      res.locals.books = result.items[0].volumeInfo.description
        .split(' ')
        .filter((word) => word.length > 3);
      // res.locals.image = result
      return next();
    });
};

controller.createPlaylist = async (req, res, next) => {
  // Minzo: THIS IS WHERE WE'VE HARDCODED, WE NEED TO PASS IT IN.
  const token = controller.token;
  console.log('TOKEN FROM CREATE PLAYLIST MIDDLEWARE', token);
  // 'BQCBhAnAat3_qGeFr1jhj-Z8O_qsPOkDgksh0icWmnDB9CY92Asa7rgEO9iHlQ4UoOd5-Ak8YjZgIsI8bSYMhKK5SCfDiTO4j6tXtEf3T4fYSE4lOFR8PlAKHOwDfjEUGMAtwxgOHZx_GAsFwkihaVUUA2Lmc2WyRiFWNRhfCeuiR_qmwLxX6CWI5oDOVLtoQR9leod2RIgsUjTqtSvxjH01af5kg5PbBJUIJVpEZn-oWyWl9K9oII38lWQJqQ';
  res.locals.token = token;
  // Minzo: need to have your own spotify account
  // added 1219159519 as minzo's spotify account
  await fetch(`https://api.spotify.com/v1/users/${'1219159519'}/playlists`, {
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
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log('playlist', result.id);

      res.locals.playlist_id = result.id;
      return next();
    });
};

controller.getRecommendations = async (req, res, next) => {
  // Minzo: these are required.
  const artistSeed = '4NHQUGzhtTLFvgF5SZesLK';
  const trackSeed = '0c6xIDDpzE81m2q797ordA';
  const genreSeed = res.locals.books;
  //const genreSeed = 'classical, country';
  // dylan hardcoded artist seed.

  //curl -X "GET" "https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer "
  await fetch(
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
      console.log(data.tracks.map((track) => track.uri));
      res.locals.tracks = data.tracks.map((track) => track.uri);
      return next();
    });
};

controller.addTracks = async (req, res, next) => {
  await fetch(
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

//SAVE title and playlist for tracks into DB
controller.saveToDB = (req, res, next) => {
  // Replace MongoDB call with SQL call

  const arr = [res.locals.title, res.locals.playlist_id, 1];
  const historyCreate =
    'INSERT INTO history (title, playlist_id, user_id) VALUES ($1, $2, $3)';

  db.query(historyCreate, arr)
    .then((data) => {
      console.log(
        'response from successful query in historyCreate middleware:'
      );
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

  // History.create({ title: res.locals.title, playlist_id: res.locals.playlist_id })
  // .then(data => {
  //   //console.log(data);
  //   return next();
  // })
  // .catch(err => {
  //   return next({
  //   log: `controller.saveToDB: ERROR: ${err}`,
  //   message: { err: 'Error occurred in controller.saveToDB. Check server logs for more details.' }
  //   })
  //  })
};

controller.sendDataBackToFront = (req, res, next) => {
  //return SQL database from object.rows

  // ### replace user_id = 1 with variable from current
  const historySelect = 'SELECT * FROM history WHERE user_id = 1';
  db.query(historySelect)
    .then((data) => {
      console.log(
        'returned data.rows from successful query in sendDataBacktoFront middleware'
      );
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

//  History.find()
//     .then(data => {
//       console.log('returned data.rows from successful query in sendDataBacktoFront middleware:', data.rows)
//       res.locals.fromDB = data
//       return next()
//      })
//     .catch(err => {
//       return next({
//       log: `controller.sendDataBackToFront: ERROR: ${err}`,
//       message: { err: 'Error occurred in controller.sendDataBackToFront. Check server logs for more details.' }
//       })
//      })

// controller.sendDataBackToFront = (req, res, next) => {
//     History.find()
//         .then((data) => {
//             //console.log(data)
//             res.locals.fromDB = data;
//             return next();
//         })
//         .catch((err) => {
//             return next({
//                 log: `controller.sendDataBackToFront: ERROR: ${err}`,
//                 message: {
//                     err: 'Error occurred in controller.sendDataBackToFront. Check server logs for more details.',
//                 },
//             });
//         });
// };

module.exports = controller;
