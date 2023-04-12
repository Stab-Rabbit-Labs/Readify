const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost/iteration';

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'spotify',
});
// .then(() => console.log('Connected to Mongo DB.'))
// .catch((err) => console.log(err));
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
    title: { type: String, required: true },
    playlistId: String,
});

const History = mongoose.model('History', historySchema);

// You must export your model through module.exports
// The collection name should be 'student'
module.exports = {
    User,
    History,
};

// const locationsSchema = new Schema({
//   name: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'reviews'
//     }
//   ]
// });
