const fetch = require('node-fetch');
const db = require('../model.js');

const spotifyController = {};

spotifyController.storeToken = (req, res, next) => {
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
            spotifyController.token = data.access_token;
            next();
        }); // data will include access token which you can use in subsequent fetch requests to the spotify API
};

spotifyController.createPlaylist = (req, res, next) => {
  console.log('inside middleware Playlist')
    const token = req.cookies['Token']
    const user = req.cookies['User']
    
    console.log('TOKEN FROM CREATE PLAYLIST MIDDLEWARE', token);
    res.locals.token = token;
    // Minzo: need to have your own spotify dev account
    // added 1219159519 as minzo's spotify account as a hard code.
    //Rachel's userID: 	1240934213
    // Alastair's userID: 22nkilsuc6ma2beir5pyhf7jq
    // fetch(`https://api.spotify.com/v1/users/22nkilsuc6ma2beir5pyhf7jq/playlists`, {
    fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
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
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          res.locals.playlist_id = result.id;
          return next();
    })
};

spotifyController.getRecommendations = (req, res, next) => {
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

spotifyController.addTracks = (req, res, next) => {
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

module.exports = spotifyController;
