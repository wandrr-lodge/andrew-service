/* eslint-disable no-console */
const moment = require('moment');

/* Utility Functions */
module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

// creates a random decimal to one place value, inclusive of min and max
module.exports.getRandomDec = (min, max) => {
  max = (max + 1) * 10;
  min *= 10;
  return Math.min(Math.floor(Math.random() * (max - min) + min) / 10, 10);
};

// generates a random date in the last two-ish years
module.exports.getRandomDate = () => {
  const date = new Date(+(new Date()) - Math.random() * 31556952000);
  return moment(date).format('YYYY-MM-DD');
};

// takes in an array of attributes
// constructs the array of column names that csv-writer needs
module.exports.generateHeader = (attributes) => {
  const header = [];
  attributes.forEach((columnName) => {
    header.push({ id: `${columnName}`, title: `${columnName}` });
  });
  return header;
};

// console logs regular updates
module.exports.giveUpdate = (count, name, start, final) => {
  const duration = (Date.now() - start) / 1000;

  if (name === 'author') console.log(`📝 ${count} ${name} records generated in ${duration} seconds! 📝`);
  else if (name === 'hostel') console.log(`🛏  ${count} ${name} records generated in ${duration} seconds! 🛏`);
  else console.log(`🚀 ${count} ${name} records generated in ${duration} seconds! 🚀`);

  const memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
  if (final === 'final') console.log(`${memory} MB used`);
};