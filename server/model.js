// user: readify pass: 123
// mongodb+srv://readify:123@cluster0.9zelvyu.mongodb.net/?retryWrites=true&w=majority

// mongoose.connect('mongodb+srv://readify:123@cluster0.9zelvyu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });

// const mongoose = require('mongoose');

// const MONGO_URI = 'mongodb://localhost/iteration';

//const ObjectId = require('mongodb').ObjectId;

// mongoose.connect(MONGO_URI, {
//     // options for the connect method to parse the URI
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // sets the name of the DB that our collections are part of
//     dbName: 'spotify',
// });
// // .then(() => console.log('Connected to Mongo DB.'))
// // .catch((err) => console.log(err));
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     userName: { type: String, required: true },
//     token: { type: String },
//     //title
//     //playlist id : []
// });

// const User = mongoose.model('User', userSchema);

// // SCHEMA FOR HISTORY
// const historySchema = new Schema({
//     title: { type: String, required: true },
//     playlistId: String,
// });

// const History = mongoose.model('History', historySchema);

// // You must export your model through module.exports
// // The collection name should be 'student'
// module.exports = {
//     User,
//     History,
// };

// --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- ---

const { Pool } = require('pg');

const PGI_URL =
    'postgres://pgynxjrw:IDgXOQHBjrWC5MPuv5jY2IedwcVmildD@ziggy.db.elephantsql.com/pgynxjrw';
//Password: IDgXOQHBjrWC5MPuv5jY2IedwcVmildD

const pool = new Pool({
    connectionString: PGI_URL,
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    },
};

// SQL Table: history
// --- --- --- --- --- --- --- --- ---
// id | title | playlist_id | user_id
// --- --- --- --- --- --- --- --- ---
// id SERIAL PRIMARY KEY
// title VARCHAR NOT NULL
// playlist_id VARCHAR NOT NULL
// user_id INTEGER NOT NULL
