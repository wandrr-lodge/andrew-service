/* eslint-disable no-console */
const mysql = require('mysql');
const config = require('./dbconfig');

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected!');
  }
});

const deleteReview = (id, callback) => {
  const queryStr = `DELETE FROM reviews WHERE id=${id}`;
  connection.query(queryStr, (err, result) => {
    if (err) { callback(err); }
    else if (result) { callback(null, result); }
  });
};

module.exports = {
  connection,
  deleteReview,
};
