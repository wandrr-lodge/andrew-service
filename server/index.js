const express = require('express');
const db = require('./database/db.js');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../public'));


app.get('hostels/:id/api/reviews', (req, res) => {
  console.log(req.params)
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

app.listen(3001, () => console.log('listening on 3001'));
