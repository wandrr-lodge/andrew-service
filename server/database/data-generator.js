/* eslint-disable indent */
const faker = require('faker');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: './data.csv',
  header: [
    { id: 'id', title: 'ID' },
    { id: 'hostel_name', title: 'Hostel_Name' },
  ],
});

const records = [
  { id: 3, hostel_name: 'Hostel3' },
  { id: 4, hostel_name: 'Hostel4' },
];

csvWriter.writeRecords(records)
  .then(() => {
    console.log('write op successful');
  })
  .catch((error) => {
    console.log('an error occurred ', error);
  });

// Goal: 10 million fake hostels
// iterate through 0 - 10M
// generate hostel${i};
// write to file

// Generate between 0 and 20 reviews for each hostel
  // iterate from 0 - 10M
  // generate a random number between 0 & 20
    // call the generate hostel function

// generateHostel FN
  // write a hostel_id
  // generate a random author_id
  // generate a random description (lorem-ipsem)
  // const ratings = ['security', 'location', 'staff',
  // 'atmosphere', 'cleanliness', 'facilities', 'value']
  // iterate over the ratings array
    // generate a random number
    // add the entry with that name and rating
    // keep a running talley of this number
  // after iterating, divide random talley by length of the ratings array, input this as the total
  // generate a random data and use moment to format it

// generate authors
  //
