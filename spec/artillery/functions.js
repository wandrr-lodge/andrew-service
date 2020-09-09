/* eslint-disable no-param-reassign */
module.exports.getWeightedId = (userContext, events, done) => {
  const weight = 0.8;
  let max = 10000000;
  let min = 0;
  // generate a random number between 0 & 1
  if (Math.random() <= weight) {
    min = max * 0.9;
  } else {
    max *= 0.9;
  }
  // add a variable to the virtual user's context
  userContext.vars.hostelId = Math.floor(Math.random() * (max - min) + min);
  return done();
};

/* Uncomment to Test:
const tries = 1000000;
const max = 10000000;
const weight = 0.8;
const record = {
  last10: 0,
  first90: 0,
};
for (let i = 0; i < tries; i += 1) {
  if (weightedId(weight, max) >= 9000000) {
    record.last10 += 1;
  } else {
    record.first90 += 1;
  }
}

console.log('last10:', record.last10);
console.log('first90:', record.first90);
console.log('ratio:', record.last10 / tries);
*/
