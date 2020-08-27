# HostileWorld Reviews Component

Contains a fullstack React module with components for displaying a hostel's reviews.

## Related Projects

  - https://github.com/hrr47-karev/imageCarousel
  - https://github.com/hrr47-karev/property-info-service
  - https://github.com/hrr47-karev/AvailabilityComponent

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)

## Requirements

### Dependencies
  - Node 14.4.0
  - "@fortawesome/fontawesome-svg-core": "^1.2.30",
  - "@fortawesome/free-solid-svg-icons": "^5.14.0",
  - "@fortawesome/react-fontawesome": "^0.1.11",
  - "axios": "^0.19.2",
  - "express": "^4.17.1",
  - "jest": "^26.2.2",
  - "jest-svg-transformer": "^1.0.0",
  - "moment": "^2.27.0",
  - "mysql": "^2.18.1",
  - "nodemon": "^2.0.4",
  - "path": "^0.12.7",
  - "react": "^16.13.1",
  - "react-dom": "^16.13.1",
  - "react-svg-loader": "^3.0.3"

### Dev Dependencies
  - "@babel/core": "^7.11.1",
  - "@babel/preset-env": "^7.11.0",
  - "@babel/preset-react": "^7.10.4",
  - "babel-loader": "^8.1.0",
  - "css-loader": "^4.2.1",
  - "enzyme": "^3.11.0",
  - "enzyme-adapter-react-16": "^1.15.3",
  - "eslint": "^7.6.0",
  - "eslint-config-airbnb": "^18.2.0",
  - "eslint-plugin-import": "^2.22.0",
  - "eslint-plugin-jsx-a11y": "^6.3.1",
  - "eslint-plugin-react": "^7.20.5",
  - "eslint-plugin-react-hooks": "^4.0.8",
  - "style-loader": "^1.2.1",
  - "webpack": "^4.44.1",
  - "webpack-cli": "^3.3.12"

## Development

### Installing Dependencies

npm install
Also install mysql or MariaDB

### Seed the Database
In server/database, change the name of dbconfig_UPDATEME.js to dbconfig.js and input the credentials for your database.
From the root of the project, run mysql -u [USER_NAME] -p <server/schema.sql
  If your user doesn't have a password, delete the -p when you run it.
npm run seed (once you get confirmation that the DB has been seeded, use CTRL+C to return to the console)

### Compile webpack
npm run build

### Start the server
npm run start

### Load the component
In your browser, navigate to http://localhost:3001/hostels/1
The number at the end is ID of the product you wish to view.
Product IDs range from 1 - 99.

### Tests
Jest is currently configured for testing, but tests do not currently work.

## Usage

With this module you can review reviews by hostel listing. You can also interact with the data using the API.

### API

- Get full information of all reviews associated with a hostel
  - Method & Path

      `GET /hostels/:hostel_id/api/reviews`

  - Sample Response
    ```sh
    [
      {
          "id": 1,
          "hostel_id": 7,
          "author_id": 1,
          "description": "Some description",
          "security": 4,
          "location": 4,
          "staff": 4,
          "atmosphere": 8,
          "cleanliness": 5,
          "facilities": 2,
          "value": 2,
          "total": 4.1,
          "created_at": "2020-05-22T07:00:00.000Z",
          "authdescription": "Avid Traveller",
          "name": "user_name",
          "gender": "Female",
          "age_group": "31-40",
          "picture_url": "URL"
      },
      {
          "id": 2,
          "hostel_id": 7,
          "author_id": 2,
          "description": "Some description",
          "security": 10,
          "location": 8,
          "staff": 10,
          "atmosphere": 4,
          "cleanliness": 4,
          "facilities": 7,
          "value": 2,
          "total": 6.4,
          "created_at": "2020-05-10T07:00:00.000Z",
          "authdescription": "Novice Nomad",
          "name": "user_name",
          "gender": "Female",
          "age_group": "31-40",
          "picture_url": "URL"
      },
    ]
    ```

- Retrieve a single review
  - Method & Path

      `GET api/reviews/:id`

  - Sample Response
    ```sh
    [
      {
          "id": 7,
          "hostel_id": 1,
          "author_id": 7,
          "description": "Some description",
          "security": 9,
          "location": 6,
          "staff": 1,
          "atmosphere": 10,
          "cleanliness": 8,
          "facilities": 8,
          "value": 1,
          "total": 6.1,
          "created_at": "2020-06-02T07:00:00.000Z",
          "authdescription": "Novice Nomad",
          "name": "user_name",
          "gender": "Male",
          "age_group": "18-24",
          "picture_url": "URL"
      }
    ]
    ```

- Add a new review
  - Method & Path

      `POST api/reviews/`

  - Request Body (All properties are **required**)
  ```sh
  {
    hostel_id: <Number>,
    author_id: <Number>,
    description: <String>, // max 255 characters
    security: <Number>, // rating out of 10
    location: <Number>, // rating out of 10
    staff <Number>, // rating out of 10
    atmosphere <Number>, // rating out of 10
    cleanliness <Number>, // rating out of 10
    facilities <Number>, // rating out of 10
    value <Number>, // rating out of 10
    total <Number>), // average of all ratings
  }
  ```

  - Sample Response
  ```sh
    Review successfully created! ID: 3003
  ```

  - Add a new review
  - Method & Path

      `POST api/reviews/:id`

  - Request Body (All properties are optional)
  ```sh
  {
    hostel_id: <Number>,
    author_id: <Number>,
    description: <String>, // max 255 characters
    security: <Number>, // rating out of 10
    location: <Number>, // rating out of 10
    staff <Number>, // rating out of 10
    atmosphere <Number>, // rating out of 10
    cleanliness <Number>, // rating out of 10
    facilities <Number>, // rating out of 10
    value <Number>, // rating out of 10
    total <Number>, // average of all ratings
  }
  ```

  - Sample Response
  ```sh
    OK
  ```


- Delete a listing
  - Method & Path

      `DELETE /api/reviews/:id`

  - Sample Response
    ```sh
    {
      "fieldCount": 0,
      "affectedRows": 1,
      "insertId": 0,
      "serverStatus": 2,
      "warningCount": 0,
      "message": "",
      "protocol41": true,
      "changedRows": 0
    }
    ```