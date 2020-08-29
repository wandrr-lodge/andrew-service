/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Utils = require('./data-generator-utils');

const numOfHostels = 10000;
const numOfAuthors = 10000;

const hostelsFilePath = './hostels.csv';
const reviewsFilePath = './reviews.csv';
const authorsFilePath = './authors.csv';

const updateThreshold = 5000;

/* Data Generation */

// takes in an integer and generates that many hostels
async function generateHostels(num, callback) {
  const start = Date.now();

  // define headers for csv
  const csvWriter = createCsvWriter({
    path: hostelsFilePath,
    header: [
      { id: 'id', title: 'id' },
      { id: 'hostel_name', title: 'hostel_name' },
    ],
  });

  let count = 0;

  for (let i = 0; i < num; i += 1) {
    try {
      // create hostel name and id
      const record = [
        { id: i, hostel_name: `hostel${i}` },
      ];
      await csvWriter.writeRecords(record)
        .then(() => {
          count += 1;
          if (count % updateThreshold === 0 && count !== num) Utils.giveUpdate(count, 'hostel', start);
        });
    } catch (error) {
      console.log('an error occurred on record ', i, error);
    }
  }
  Utils.giveUpdate(count, 'hostel', start, 'final');
  callback();
}

// takes in the number of hostels
// generates a random number of reviews for each hostel
async function generateReviews(num, callback) {
  const start = Date.now();

  // names of columns for the CSV file
  const attributes = ['review_id', 'hostel_id', 'author_id', 'description', 'date', 'security', 'location',
    'staff', 'atmosphere', 'cleanliness', 'facilities', 'value', 'total'];

  const header = Utils.generateHeader(attributes);

  // define the headers
  const csvWriter = createCsvWriter({ path: reviewsFilePath, header });

  let count = 0;
  // iterate over hostel ids
  for (let i = 0; i < num; i += 1) {
    // generate a random number of reviews between 1 & 10
    const numOfReviews = Utils.getRandomInt(1, 10);

    // generate that many reviews
    for (let j = 0; j < numOfReviews; j += 1) {
      // add initial attributes to the record
      try {
        let record = {
          review_id: count,
          hostel_id: i,
          author_id: Utils.getRandomInt(1, numOfAuthors),
          description: faker.lorem.paragraph(),
          date: Utils.getRandomDate(),
        };
        // loop through the rest of the attributes array
        // add all ratings attributes except total to the record
        let ratingsTotal = 0;
        let ratingsCount = 0;
        for (let k = 5; k < attributes.length - 1; k += 1) {
          const rating = Utils.getRandomDec(1, 10);
          record[attributes[k]] = rating;
          // keep track of the running total and count
          ratingsTotal += rating;
          ratingsCount += 1;
        }

        // find the average rating and add to the record
        // eslint-disable-next-line no-mixed-operators
        record.total = Math.round(ratingsTotal * 10 / ratingsCount) / 10;
        // place in an array (required by csv-writer)
        record = [record];
        // write record to the file
        await csvWriter.writeRecords(record)
          .then(() => {
            count += 1;
            if (count % updateThreshold === 0 && count !== num) Utils.giveUpdate(count, 'review', start);
          });
      } catch (error) {
        console.log(`an error occurred on hostel ${i}, review ${j}`, error);
      }
    }
  }
  Utils.giveUpdate(count, 'review', start, 'final');
  callback();
}

// takes in the number of authors
// generates that many authors
async function generateAuthors(num, callback) {
  const start = Date.now();

  // names of columns for the CSV file
  const attributes = ['author_id', 'name', 'age_group', 'gender', 'authdescription'];
  const userAges = ['18-24', '25-30', '31-40', '41+'];
  const userDescriptions = ['Globetrotter', 'Avid Traveller', 'Novice Nomad'];
  const genders = ['Female', 'Male'];

  const header = Utils.generateHeader(attributes);

  // define the headers
  const csvWriter = createCsvWriter({ path: authorsFilePath, header });

  // generate author entries
  let count = 0;
  for (let i = 0; i < num; i += 1) {
    try {
      // generate an entry
      const record = [
        {
          author_id: i,
          name: faker.internet.userName(),
          age_group: userAges[Utils.getRandomInt(0, 4)],
          gender: genders[Utils.getRandomInt(0, 2)],
          authdescription: userDescriptions[Utils.getRandomInt(0, 3)],
        },
      ];
      await csvWriter.writeRecords(record)
        .then(() => {
          count += 1;
          if (count % updateThreshold === 0 && count !== num) Utils.giveUpdate(count, 'author', start);
        });
    } catch (error) {
      console.log('an error occurred on record ', i, error);
    }
  }
  Utils.giveUpdate(count, 'author', start, 'final');
  callback();
}

generateHostels(numOfHostels, () => {
  generateReviews(numOfHostels, () => {
    generateAuthors(numOfAuthors, () => {});
  });
});
