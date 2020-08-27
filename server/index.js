/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const express = require('express');
const path = require('path');
const moment = require('moment');
const db = require('./database/db.js');

const app = express();

app.use((req, res, next) => {
  console.log(`serving ${req.method} for ${req.url}`);
  next();
});

app.use(express.json());
app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));

app.get('/hostels/:id/api/reviews', (req, res) => {
  const queryStr = `SELECT * FROM reviews INNER JOIN authors ON reviews.author_id = authors.id WHERE reviews.hostel_id = ${req.params.id}`;
  db.connection.query(queryStr, (err, response) => {
    if (err) {
      console.log(`an error occured getting all reviews for hostel id ${req.params.id}`, err);
      res.sendStatus(500);
    } else {
      console.log('query successful');
      res.json(response);
    }
  });
});

app.get('/api/reviews/:id', (req, res) => {
  const queryStr = `SELECT * FROM reviews INNER JOIN authors ON reviews.author_id = authors.id WHERE reviews.id = ${req.params.id}`;
  db.connection.query(queryStr, (err, response) => {
    if (err) {
      console.log(`an error occured getting review id ${req.params.id}`, err);
      res.sendStatus(500);
    } else {
      console.log('query successful');
      res.json(response);
    }
  });
});

app.post('/api/reviews', (req, res) => {
  if (req.body === undefined) {
    res.status(400).send('please include data to populate the review');
  }
  const {
    hostel_id, author_id, description, security, location,
    staff, atmosphere, cleanliness, facilities, value, total,
  } = req.body;

  // check if any fields are missing
  if ((!hostel_id || !author_id || !description || !security
    || !location || !staff || !atmosphere || !cleanliness
    || !facilities || !value || !total) === undefined) {
    res.status(400).send(`the following fields are required: {
      hostel_id: <Number>,
      author_id: <Number>,
      description: <String>, // max 255 characters
      security: <Number>, // rating out of 10
      location: <Number>, // rating out of 10
      staff <Number>, // rating out of 10
      atmosphere <Number>, // rating out of 10
      cleanliness <Number>, // rating out of 10
      facilities <Number>, // rating out of 10
      value <Number>, // rating out of 10
      total <Number>, // average of all ratings,
    }`);
  } else {
    // get the current timestamp and format it
    const timestamp = Date.now();
    let created_at = new Date(timestamp);
    created_at = moment(created_at).format('YYYY-MM-DD');

    const queryStr = `INSERT INTO reviews (hostel_id, author_id, description, security, location, staff, atmosphere, cleanliness, facilities, value, total, created_at) VALUES ("${hostel_id}", "${author_id}", "${description}", "${security}", "${location}", "${staff}", "${atmosphere}", "${cleanliness}", "${facilities}", "${value}", "${total}", "${created_at}")`;

    db.connection.query(queryStr, (err, result) => {
      if (err) {
        console.log('error in post request: ', err);
        res.sendStatus(500);
      } else if (result) {
        res.status(201).send(`review created! insertId: ${result.insertId}`);
      }
    });
  }
});

app.put('/api/reviews/:id', (req, res) => {
  // construct the list of columns and values to update
  let columns = '';
  for (const property in req.body) {
    columns += `${property}="${req.body[property]}",`;
  }

  // check if data was provided in the req
  if (columns.length === 0) {
    res.status(400).send('please provide data to update');
  }

  // remove the last comma
  columns = columns.slice(0, -1);

  // query the database
  const queryStr = `UPDATE reviews SET ${columns}
  WHERE id=${req.params.id}`;
  db.connection.query(queryStr, (err, result) => {
    if (err) {
      console.log('an error occurred in the put request: ', err);
      res.sendStatus(500);
    } else if (result) {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/reviews/:id', (req, res) => {
  db.deleteReview(req.params.id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result) { res.send(result); }
  });
});

app.listen(3001, () => console.log('listening on 3001'));
