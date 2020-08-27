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

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).
- Node 6.13.0
- etc

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