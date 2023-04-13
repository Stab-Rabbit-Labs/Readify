const fetch = require('node-fetch');
// const { History } = require('./model');
const db = require('../model.js');
const spotifyController = require('./spotifyController.js');

const bookController = {};

bookController.getTitle = (req, res, next) => {
    const { title } = req.body;
    res.locals.title = title;

    fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCXUjqCkxkBUW53n9BRZdQpzmtEb6BwYIk`
    )
        .then((response) => response.json())
        .then((result) => {
            // console.log(
            //   'bookinfo',
            //   result.items[0].volumeInfo.imageLinks.thumbnail,
            //   result.items[0].volumeInfo.description
            // );
            res.locals.image = result.items[0].volumeInfo.imageLinks.thumbnail;
            res.locals.books = result.items[0].volumeInfo.description
                .split(' ')
                .filter((word) => word.length > 3);
            return next();
        });
};

module.exports = bookController;
