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
