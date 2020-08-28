/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable indent */ // TODO: remove this line
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const numOfHostels = 1000;
const numOfAuthors = 100;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

// get a random decimal to one place value, inclusive of min and max
// eslint-disable-next-line arrow-body-style
const getRandomDec = (min, max) => {
  return Math.min(Math.floor(Math.random() * ((max + 1) * 10 - min * 10) + min * 10) / 10, 10);
};

// takes in an integer and generates that many hostels
async function generateHostels(num) {
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
  for (var i = 0; i < num; i += 1) {
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
// generateHostels(numOfHostels);

// takes in the number of hostels
// generates a random number of reviews for each hostel
async function generateReviews(num) {
  // names of columns for the CSV file
  const attributes = ['hostel_id', 'author_id', 'description', 'security', 'location',
    'staff', 'atmosphere', 'cleanliness', 'facilities', 'value', 'total'];

  // construct the array of headers that csv-writer needs
  const header = [{ id: 'id', title: 'id' }];
  for (let i = 0; i < attributes.length; i += 1) {
    header.push({ id: `${attributes[i]}`, title: `${attributes[i]}` });
  }
  // define the headers
  const csvWriter = createCsvWriter({ path: './reviews.csv', header });

  // iterate over hostel ids
  for (let i = 0; i < num; i += 1) {
    // generate a random number of reviews between 0 & 10
    const numOfReviews = getRandomInt(10);
    // generate that many reviews
    for (let j = 0; j < numOfReviews; j += 1) {
      const record = {
        hostel_id: getRandomInt(1, numOfHostels),
        author_id: getRandomInt(1, numOfAuthors),
        description: faker.lorem.paragraph(),
        security: getRandomInt(0, )
      };

    }

  }
}
//generateReviews(numOfHostels);

// Generate between 0 and 20 reviews for each hostel
  // iterate from 0 - 10M
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
