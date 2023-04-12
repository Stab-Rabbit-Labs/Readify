const express = require('express');
const router = express.Router();
const controller = require('./controller');

// GET BOOK
router.post(
  '/get-title',
  controller.getTitle,
  controller.createPlaylist,
  controller.getRecommendations,
  controller.addTracks,
  controller.saveToDB,
  (req, res) => {
    const playlist_id = res.locals.playlist_id;
    const imageURL = res.locals.image;
    res.status(200).send({ playlist_id: playlist_id, imageURL: imageURL });
  }
);


// Minzo: this is a post request, after login, post request coming from spotify.
router.use('/callback', controller.storeToken, (req, res) => {
    console.log('have made it to the /callback, this is the token', controller.token);
    // console.log(controller.token);
    return res.status(200).redirect('/'); // double check this address when we start trying to get the client to work
});


module.exports = router;  
