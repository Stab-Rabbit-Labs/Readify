const fetch = require('node-fetch');
const db = require('../model.js');
const spotifyController = require('./spotifyController.js');

const dbController = {};

//SAVE title and playlist for tracks into SQL DB
dbController.saveToDB = (req, res, next) => {
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

dbController.sendDataBackToFront = (req, res, next) => {
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

module.exports = dbController;
