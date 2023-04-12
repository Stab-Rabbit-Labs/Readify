const path = require('path');
const fs = require('file-system');
const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const controller = require('./controller');

const app = express();

const router = require('./router.js');

const PORT = 3000;

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));
// app.use('/client',express.static(path.resolve(__dirname, './client')));

// Minzo: on get req to /, send index.html

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
    //  res.sendFile(path.resolve(__dirname + 'client' + 'index.html'))
});

// Minzo: idk why we would want bundle, but get bundle?

//###Bundle Call? Could be a quick fix for the webpack issues they were having
app.get('/dist/bundle.js', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
});

// login and callback are used for autentification (OAuth)

// Minzo: go over this with group, can't wrap my head around it.
app.get('/login', function (req, res) {
    // scope is what spotify set and describes what you're allowed to do with the token
    var scope =
        'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    const params = new URLSearchParams();
    params.append('response_type', 'code');
    // added minzo's client_id
    params.append('client_id', '42c01af939954a35a024a9d4aee4b125');
    // Minzo: next step have to whitelist URI.
    // need to send to the correct URI, not callback. Thinking straight to middleware.
    params.append('redirect_uri', 'http://localhost:3000/api/callback');
    params.append('scope', scope); // spotify requires URL encoded, not json

    //var state = generateRandomString(16);
    res.status(301).redirect(
        'https://accounts.spotify.com/authorize?' + params.toString()
    ); // 301 is HTTP code for redirect, the params get put into the string
});

// Minzo: on getting history, sends back info from DB to res.locals.

app.get('/history', controller.sendDataBackToFront, (req, res) => {
    const historyData = res.locals.fromDB;
    res.status(200).send(historyData);
});

// Minzo: connecting front to back I believe, according to the webpack.

app.use('/api', router);

//catch all
app.use((req, res) =>
    res.status(404).send("This is not the page you're looking for...")
);

// default error
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
