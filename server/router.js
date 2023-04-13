const express = require('express');
const router = express.Router();
// const controller = require('./controller');
const bookController = require('./controller/bookController.js');
const dbController = require('./controller/dbController.js');
const spotifyController = require('./controller/spotifyController.js');

// GET BOOK
router.post(
    '/get-title',
    bookController.getTitle,
    spotifyController.createPlaylist,
    spotifyController.getRecommendations,
    spotifyController.addTracks,
    dbController.saveToDB,
    (req, res) => {
        const playlist_id = res.locals.playlist_id;
        const imageURL = res.locals.image;
        res.status(200).send({ playlist_id: playlist_id, imageURL: imageURL });
    }
);

// Minzo: this is a post request, after login, post request coming from spotify.
router.use('/callback', spotifyController.storeToken, (req, res) => {
    console.log(
        'have made it to the /callback, this is the token',
        spotifyController.token
    );
    // console.log(controller.token);
    return res.status(200).redirect('/'); // double check this address when we start trying to get the client to work
});

module.exports = router;
