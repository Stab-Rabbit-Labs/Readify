// user: readify pass: 123
// mongodb+srv://readify:123@cluster0.9zelvyu.mongodb.net/?retryWrites=true&w=majority

// mongoose.connect('mongodb+srv://readify:123@cluster0.9zelvyu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });




const mongoose = require('mongoose');


//const ObjectId = require('mongodb').ObjectId;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  token: { type: String },
  //title
  //playlist id : []
});

const User = mongoose.model('User', userSchema);

// SCHEMA FOR HISTORY
const historySchema = new Schema({
  title: {type:String, required:true},
  playlistId : String
})

const History = mongoose.model('History',historySchema)

// You must export your model through module.exports
// The collection name should be 'student'
module.exports = {
  User,
  History
};

// --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- ---

const { Pool } = require('pg')



//PGI URL: postgres://pgynxjrw:IDgXOQHBjrWC5MPuv5jY2IedwcVmildD@ziggy.db.elephantsql.com/pgynxjrw
//Password: IDgXOQHBjrWC5MPuv5jY2IedwcVmildD

// // create row in history table with SQL query, title is 'Gulliver's Travels', playlistId is '456'
// INSERT INTO History (title, playlistId) VALUES ('Gullivers Travels', '456');

// SQL Table: history
// --- --- --- --- --- --- --- --- ---
// id | title | playlistId
// --- --- --- --- --- --- --- --- ---
// id SERIAL PRIMARY KEY
// title VARCHAR NOT NULL
// playlistId VARCHAR NOT NULL

//userId for using join table to pull individual history upon login

//UserSchema is not used at the moment but could be useful for when we do auth -- will have to maybe connect the history table with
//the user id to pull specific data per user