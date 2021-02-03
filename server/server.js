/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
require('newrelic');
require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('../database/postgres/postgres.js');
const errorMessages = require('./errorMsg.js');

const app = express();

app.use((req, res, next) => {
  console.log(`serving ${req.method} for ${req.url}`);
  next();
});

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));

app.get('/hostels/:id/api/reviews', (req, res) => {
  db.getReviewsByHostel(req.params.id)
    .then((rows) => {
      // console.log('rows:', typeof rows[0].security);
      console.log('query successful for hostel id', req.params.id);
      res.status(200).send(rows);
    })
    .catch((error) => {
      console.log(errorMessages.allReviews, req.params.id, error);
      res.sendStatus(500);
    });
});

app.get('/api/reviews/:id', (req, res) => {
  db.getReviewsById(req.params.id)
    .then((rows) => {
      console.log('query successful for review id', req.params.id);
      res.status(200).send(rows);
    })
    .catch((error) => {
      console.log(errorMessages.review, req.params.id, error);
      res.sendStatus(500);
    });
});

app.post('/hostels/:id/api/reviews', (req, res) => {
  if (req.body === undefined) {
    res.status(400).send(errorMessages.missingData);
  }

  const properties = ['author_id', 'description', 'security', 'location', 'staff', 'atmosphere', 'cleanliness', 'facilities', 'value', 'total'];

  let aPropIsMissing = false;

  // check if body has all of the required fields
  for (let propIndex = 0; propIndex < properties.length; propIndex += 1) {
    if (!Object.hasOwnProperty.call(req.body, properties[propIndex])) {
      aPropIsMissing = true;
      res.status(400).send(errorMessages.missingProps);
      break;
    }
  }

  if (!aPropIsMissing) {
    // query the database
    db.createReview(req.params.id, req.body)
      .then((rowCount) => {
        console.log('rowcount', rowCount);
        res.status(201).send(`${rowCount} review successfully created!`);
      })
      .catch((error) => {
        console.log('error in post request: ', error);
        res.sendStatus(500);
      });
  }
});

app.put('/api/reviews/:id', (req, res) => {
  // construct the list of columns and values to update
  let columns = '';
  for (const property in req.body) {
    columns += `${property}='${req.body[property]}',`;
  }

  // check if data was provided in the req
  if (columns.length === 0) {
    res.status(400).send(errorMessages.missingData);
  }

  // remove the last comma
  columns = columns.slice(0, -1);

  // query the database
  db.updateReview(columns, req.params.id)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log('an error occurred in the put request: ', error);
      res.sendStatus(500);
    });
});

app.delete('/api/reviews/:id', (req, res) => {
  db.deleteReview(req.params.id)
    .then((rowCount) => res.send(`${rowCount} review deleted.`))
    .catch(() => res.sendStatus(500));
});

app.listen(process.env.SERVER_PORT, () => console.log('listening on', process.env.SERVER_PORT));
