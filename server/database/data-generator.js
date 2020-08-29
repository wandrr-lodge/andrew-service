/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable indent */ // TODO: remove this line
const faker = require('faker');
const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

const numOfHostels = 10;
const numOfAuthors = 100;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

// get a random decimal to one place value, inclusive of min and max
// eslint-disable-next-line arrow-body-style
const getRandomDec = (min, max) => {
  max = (max + 1) * 10;
  min *= 10;
  return Math.min(Math.floor(Math.random() * (max - min) + min) / 10, 10);
};

const getRandomDate = () => {
  const date = new Date(+(new Date()) - Math.random() * 31556952000);
  return moment(date).format('YYYY-MM-DD');
};

const generateHeader = (attributes) => {
  // construct the array of headers that csv-writer needs
  const header = [];
  for (let i = 0; i < attributes.length; i += 1) {
    header.push({ id: `${attributes[i]}`, title: `${attributes[i]}` });
  }
  return header;
}

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
  const attributes = ['review_id', 'hostel_id', 'author_id', 'description', 'date', 'security', 'location',
    'staff', 'atmosphere', 'cleanliness', 'facilities', 'value', 'total'];

  // construct the array of headers that csv-writer needs
  const header = [];
  for (let i = 0; i < attributes.length; i += 1) {
    header.push({ id: `${attributes[i]}`, title: `${attributes[i]}` });
  }
  // define the headers
  const csvWriter = createCsvWriter({ path: './reviews.csv', header });

  // iterate over hostel ids
  for (var i = 0; i < num; i += 1) {
    // generate a random number of reviews between 0 & 10
    const numOfReviews = getRandomInt(1, 10);
    console.log('data-generator is running!', numOfReviews);

    // generate that many reviews
    for (var j = 0; j < numOfReviews; j += 1) {
      // add initial attributes to the record
      try {
        let record = {
          review_id: i + j,
          hostel_id: i,
          author_id: getRandomInt(1, numOfAuthors),
          description: faker.lorem.paragraph(),
          date: getRandomDate(),
        };
        // loop through the rest of the attributes array
        // add all ratings attributes except total to the record
        let ratingsTotal = 0;
        let ratingsCount = 0;
        for (let k = 5; k < attributes.length - 1; k += 1) {
          const rating = getRandomDec(1, 10);
          record[attributes[k]] = rating;
          // keep track of the running total and count
          ratingsTotal += rating;
          ratingsCount += 1;
        }

        // find the average rating and add to the record
        // eslint-disable-next-line no-mixed-operators
        record['total'] = Math.round(ratingsTotal * 10 / ratingsCount) / 10;
        record = [record];
        console.log('record: ', record);
        // write record to the file
        await csvWriter.writeRecords(record)
          .then(() => console.log(`hostel ${i} review ${j} created!`));
      } catch (error) {
        console.log(`an error occurred on hostel ${i}, review ${j}`, error);
      }
    }
  }
  console.log(i * j, 'reviews generated');
}
// generateReviews(1);

// takes in the number of authors
// generates that many authors
async function generateAuthors(num) {
  // names of columns for the CSV file
  const attributes = ['author_id', 'name', 'age_group', 'gender', 'authdescription'];
  const userAges = ['18-24', '25-30', '31-40', '41+'];
  const userDescriptions = ['Globetrotter', 'Avid Traveller', 'Novice Nomad'];
  const genders = ['Female', 'Male'];

  const header = generateHeader(attributes);

  // define the headers
  const csvWriter = createCsvWriter({ path: './authors.csv', header });

  for (var i = 0; i < num; i += 1) {
    try {
      // create author name and id
      const record = [
        {
          author_id: i,
          name: faker.internet.userName(),
          age_group: userAges[getRandomInt(0, 4)],
          gender: genders[getRandomInt(0, 2)],
          authdescription: userDescriptions[getRandomInt(0, 3)],
        },
      ];
      // console.log('author record: ', record);
      await csvWriter.writeRecords(record);
    } catch (error) {
      console.log('an error occurred on record ', i, error);
    }
  }
  console.log(i, 'author records generated.');
}

generateAuthors(numOfAuthors);

/*
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  authdescription VARCHAR(64),
  name VARCHAR(64) UNIQUE,
  gender VARCHAR(64),
  age_group VARCHAR(64),
  picture_url TEXT
*/
// generate authors
  //
