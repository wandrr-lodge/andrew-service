/* eslint-disable no-console */
const { Client } = require('pg');
const config = require('./db_postgres_config');
const { getRandomInt } = require('../data/data-generator-utils');

const client = new Client(config);

// config variables
const records = 5048; // number of reviews
const joinedQuery = true;
const connectionType = 'client'; // client or pool
const sameRecord = false; // whether the query asks for a different record each time

let reviewID;
let query;
if (!sameRecord) {
  const last90 = Math.floor(records * 0.9);
  reviewID = getRandomInt(last90, records);
} else {
  reviewID = Math.floor(records * 0.9);
}

if (!joinedQuery) {
  query = `SELECT * FROM reviews WHERE review_id=${reviewID}`;
} else {
  query = `SELECT * FROM reviews, authors, hostels
  WHERE reviews.review_id=${reviewID}
  AND reviews.author_id = authors.id
  AND reviews.hostel_id = hostels.id`;
}

(async () => {
  // start timer
  const start = Date.now();
  await client.connect();

  const res = await client.query(query);
  // stop timer
  const end = Date.now();

  console.log('res:', res.rows);
  console.log(`response in ${(end - start) / 1000} seconds`);
  await client.end();
})();
