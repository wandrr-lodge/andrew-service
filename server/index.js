const express = require('express');
const db = require('./database/db.js')

const app = express();

app.use(express.json());

let hostelId;

app.post('/api/reviews', (req, res) => {
  hostelId = req.body.id;
  res.sendStatus(201);
});

app.get('/api/reviews', (req, res) => {
  if (hostelId === undefined) {
    res.end();
  } else {
    let queryStr = `SELECT * FROM reviews, authors WHERE reviews.hostel_id = ${hostelId}`;
    db.connection.query(queryStr, (err, response) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(response);
      }
    })
  }
})


app.listen(3001, () => console.log('listening on 3001'));