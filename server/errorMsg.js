module.exports = {
  allReviews: 'an error occured getting all reviews for hostel id',

  review: 'an error occured getting review id',

  missingData: 'please include data about the review',

  // for post requests with missing properties
  missingProps: `the following fields are required: {
    author_id: <Number>,
    description: <String>, // max 255 characters
    security: <Number>, // rating out of 10
    location: <Number>, // rating out of 10
    staff <Number>, // rating out of 10
    atmosphere <Number>, // rating out of 10
    cleanliness <Number>, // rating out of 10
    facilities <Number>, // rating out of 10
    value <Number>, // rating out of 10
    total <Number>, // average of all ratings,
  }`,

}