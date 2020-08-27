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

## Development

### Installing Dependencies

npm install
Make sure you install mysql or MariaDB

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
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum imperdiet metus, ac imperdiet libero. Suspendisse scelerisque nisi sit amet neque suscipit",
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
          "description": "Nunc non ultricies ipsum. Curabitur at quam elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sed nunc dui. Duis tristique, risus at ornare eleifend",
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
          "description": "Sed id elit ac libero viverra semper eget id erat. Maecenas at aliquam elit. Morbi et aliquam sapien. Proin imperdiet placerat vehicula.",
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
    created_at DATE,
  }
  ```

  - Sample Response
  ```sh
    review created! insertId: 3003
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