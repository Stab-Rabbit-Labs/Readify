const fetch = require ('node-fetch');
const { Mongoose, model } = require('mongoose');
const { History } = require('./model');
const ObjectId = require('mongodb').ObjectId;
const { Buffer } = require ('buffer');
const db = require('./model.js');

const controller = {};

// GOOGLE BOOKS API
controller.getTitle = async (req,res,next) => {
  //console.log(req.body);
  const { title } = req.body;
  res.locals.title = title;

  await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCXUjqCkxkBUW53n9BRZdQpzmtEb6BwYIk`)
    .then(response => response.json())
    .then(result => {
        console.log('bookinfo', result.items[0].volumeInfo.imageLinks.thumbnail);
        //res.locals.bookInfo = result.items[0].volumeInfo.categories[0]
        res.locals.image = result.items[0].volumeInfo.imageLinks.thumbnail
        res.locals.books = result.items[0].volumeInfo.description.split(' ').filter(word => word.length > 3);
        // res.locals.image = result 
      return next()
      }
    )}

  controller.createPlaylist = async (req, res, next) => {
    const token = 'BQBLGZnzKaDzsewShdTytejgHRTu1kDY4PA3hqnSg_lYx6rXpCPLOSYUY9Yw2qHDLw2MywPZLEZnerZZLoEtcT9LE-986AxteOjScNFVcAoSU-zGSaGpKNOQZ61Xj5uu4pcMhKBXpwPd8QOpennRTKZkZ68l6cvkH2XwiX6JKNMr9wXd5z6bKrnh6vy0KxiPabY9RejLtNVAQ_yNlFXNpN2-UeVQdXZvmeO9Oednkt-pukMs2FMnIVVYosJ25A';
    res.locals.token = token;
    await fetch(`https://api.spotify.com/v1/users/${'dingleboss'}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: res.locals.title,
        description: '',
        public: false,
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log('playlist', result.id);

        res.locals.playlistId = result.id;
        return next()
      }
      )
  }


  controller.getRecommendations = async (req, res, next) => {
    const artistSeed = '4NHQUGzhtTLFvgF5SZesLK';
    const trackSeed = '0c6xIDDpzE81m2q797ordA';
    const genreSeed = res.locals.books;
    //const genreSeed = 'classical, country';

    //curl -X "GET" "https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer "
    await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${artistSeed}&seed_tracks=${trackSeed}&seed_genre${genreSeed.join(',')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${res.locals.token}`
      }
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.tracks.map(track => track.uri));
        res.locals.tracks = data.tracks.map(track => track.uri);
        return next();
      })
  }

  controller.addTracks = async (req, res, next) => {
    await fetch(`https://api.spotify.com/v1/playlists/${res.locals.playlistId}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${res.locals.token}`,
      },
      body: JSON.stringify({
        uris: res.locals.tracks
      })
    })
      .then(data => next());
  }


//SAVE title and playlist for tracks into DB
controller.saveToDB = (req, res, next) => {
  // Replace MongoDB call with SQL call

  const arr = [res.locals.title, res.locals.playlistId, 1];
  const historyCreate = 'INSERT INTO history (title, playlist_id, user_id) VALUES ($1, $2, $3)';

  db.query(historyCreate, arr)
    .then((data) => {
      console.log('response from successful query in historyCreate middleware:', data);
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

  // History.create({ title: res.locals.title, playlistId: res.locals.playlistId })
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
}
 
controller.sendDataBackToFront = (req, res, next) => {
  //return SQL database from object.rows

  // ### replace user_id = 1 with variable from current
  const historySelect = 'SELECT * FROM history WHERE user_id = 1';
  db.query(historySelect)
    .then((data) => {
      console.log(
        'returned data.rows from successful query in sendDataBacktoFront middleware:',
        data.rows
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


module.exports = controller; 