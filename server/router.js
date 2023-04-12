const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Minzo: this isn't; necessary
// GETS SPOTIFY TOKEN
// get-token creating an access token

// router.post('/get-token',
// controller.getToken, (err, res, body) => {
//   if (!err && res.statusCode === 200) {
//     const token = body.access_token;
//   }
// });

// GET BOOK
router.post(
    '/get-title',
    controller.getTitle,
    controller.createPlaylist,
    controller.getRecommendations,
    controller.addTracks,
    controller.saveToDB,
    (req, res) => {
        const playlistId = res.locals.playlistId;
        const imageURL = res.locals.image;
        res.status(200).send({ playlistId: playlistId, imageURL: imageURL });
    }
);

// router.get('/login', function(req, res) {
//   // scope is what spotify set and describes what you're allowed to do with the token
//   var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
//   const params = new URLSearchParams();
//   params.append('response_type', 'code');
//   params.append('client_id', '919322e8de7f4fb299a489a332012dc6');
//   params.append('redirect_uri', 'http://localhost:3000/api/callback')
//   params.append('scope', scope); // spotify requires URL encoded, not json

//   //var state = generateRandomString(16);
//   res.status(301).redirect('https://accounts.spotify.com/authorize?' + params.toString()) // 301 is HTTP code for redirect, the params get put into the string
// });
// we get redirect from spotify to go redirect URL

// Minzo: this is a post request, after login, post request coming from spotify.
router.post('/callback', controller.storeToken, (req, res) => {
    return res.status(200).redirect('/'); // double check this address when we start trying to get the client to work
});

// TEST SAMPLE ONLY ONE ADDRESS FOR EACH REQUEST
//serve index html
// router.get('/', (req, res) => {
//   return res
//     .status(200)
//     .send('sendingggg') //working
// });

module.exports = router;
