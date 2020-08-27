/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const db = require('./database/db.js');

const app = express();

app.use(express.json());
app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));

app.get('/hostels/:id/api/reviews', (req, res) => {
  const queryStr = `SELECT * FROM reviews INNER JOIN authors ON reviews.author_id = authors.id WHERE reviews.hostel_id = ${req.params.id}`;
  db.connection.query(queryStr, (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('done');
      res.json(response);
    }
  });
});

/*
app.post('/hostels/:id/api/reviews', (req, res) => {
  const queryStr = '';
  db.connection.query
});
*/

/*
app.put('/hostels/:id/api/reviews', (req, res) => {
  const queryStr = '';
  db.connection.query
});
*/

app.delete('/api/reviews/:id', (req, res) => {
  db.deleteReview(req.params.id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result) { res.send(result); }
  });
});

app.listen(3001, () => console.log('listening on 3001'));
