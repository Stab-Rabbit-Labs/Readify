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

PGI_URL: 'postgres://pgynxjrw:IDgXOQHBjrWC5MPuv5jY2IedwcVmildD@ziggy.db.elephantsql.com/pgynxjrw'
//Password: IDgXOQHBjrWC5MPuv5jY2IedwcVmildD

const pool = new Pool({
  connectionString: PG_URL
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