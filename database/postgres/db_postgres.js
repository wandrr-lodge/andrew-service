/* eslint-disable no-console */
const { Client } = require('pg');
const config = require('./db_postgres_config');

const client = new Client(config);

const reviewsRecords = 5048;

(async () => {
  const reviewId = Math.floor(reviewsRecords * 0.9);

  // start timer
  const start = Date.now();
  await client.connect();

  // determine review to query

  const res = await client.query(`SELECT * FROM reviews WHERE review_id=${reviewId}`);
  // stop timer
  const end = Date.now();

  console.log('res:', res.rows);
  console.log(`response in ${(end - start) / 1000} seconds`);
  await client.end();
})();
