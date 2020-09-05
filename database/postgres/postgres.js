/* eslint-disable no-console */
const { Client } = require('pg');
const config = require('./db_postgres_config');

const client = new Client(config);

(async () => {
  await client.connect();
})();

// get all reviews by hostel name, joined with authors and hostels
const getReviewsByHostel = async (id) => {
  const queryStr = `SELECT * FROM reviews, authors, hostels
  WHERE reviews.hostel_id=${id}
  AND reviews.author_id = authors.id
  AND reviews.hostel_id = hostels.id`;

  const res = await client.query(queryStr);
  return res.rows;
};

// const queryStr = `SELECT * FROM reviews INNER JOIN authors ON reviews.author_id = authors.id
// WHERE reviews.hostel_id = ${id}`;

// await client.end();

// get all reviews by id

// post a new review

// update a review by id

// delete a review

exports.module = {
  getReviewsByHostel,
}