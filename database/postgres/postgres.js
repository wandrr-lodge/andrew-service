/* eslint-disable camelcase */
/* eslint-disable no-console */
const { Client } = require('pg');
const moment = require('moment');
const config = require('./db_postgres_config');

const client = new Client(config);

(async () => {
  await client.connect()
    .then(() => console.log('database connected!'))
    .catch((error) => console.log('error connecting to the database:', error));
})();

// get all reviews by hostel name, joined with authors and hostels
const getReviewsByHostel = async (id) => {
  const queryStr = `SELECT * FROM reviews, authors, hostels
  WHERE reviews.hostel_id=$1
  AND reviews.author_id = authors.id
  AND reviews.hostel_id = hostels.id`;

  const res = await client.query(queryStr, [id]);
  return res.rows;
};

// get all reviews by id
const getReviewsById = async (id) => {
  const queryStr = `SELECT * FROM reviews, authors, hostels
  WHERE reviews.review_id=$1
  AND reviews.author_id = authors.id
  AND reviews.hostel_id = hostels.id`;

  const res = await client.query(queryStr, [id]);
  return res.rows;
};

const createReview = async (body) => {
  const {
    hostel_id, author_id, description, security, location,
    staff, atmosphere, cleanliness, facilities, value, total,
  } = body;

  // get the current timestamp and format it
  const timestamp = Date.now();
  let createdAt = new Date(timestamp);
  createdAt = moment(createdAt).format('YYYY-MM-DD');

  const queryStr = 'INSERT INTO reviews (hostel_id, author_id, description, date, security, location, staff, atmosphere, cleanliness, facilities, value, total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';

  const params = [hostel_id, author_id, description, createdAt, security,
    location, staff, atmosphere, cleanliness, facilities, value, total];

  const res = await client.query(queryStr, params);

  return res.rowCount;
};

const updateReview = async (columns, id) => {
  const queryStr = `UPDATE reviews SET ${columns}
  WHERE review_id=$1`;

  const res = await client.query(queryStr, [id]);
  return res;
};

const deleteReview = async (id) => {
  const queryStr = 'DELETE FROM reviews WHERE review_id=$1';

  const res = await client.query(queryStr, [id]);
  return res.rowCount;
};

// const queryStr = `SELECT * FROM reviews INNER JOIN authors ON reviews.author_id = authors.id
// WHERE reviews.hostel_id = ${id}`;

// await client.end();


// post a new review

// update a review by id

// delete a review

module.exports = {
  getReviewsByHostel,
  getReviewsById,
  createReview,
  updateReview,
  deleteReview,
};
