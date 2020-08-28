/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable indent */
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


async function generateHostels() {
  // define headers for csv
  const csvWriter = createCsvWriter({
    path: './hostels.csv',
    header: [
      { id: 'id', title: 'id' },
      { id: 'hostel_name', title: 'hostel_name' },
    ],
  });

  // Goal: 10 million fake hostels
  // iterate through 0 - 10M
  for (var i = 0; i < 1000; i += 1) {
    try {
      // create hostel name and id
      const record = [
        { id: i, hostel_name: `hostel${i}` },
      ];
      await csvWriter.writeRecords(record);
    } catch (error) {
      console.log('an error occurred on record ', i, error);
    }
  }
  console.log(i, 'hostel records generated.');
}
generateHostels();

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
