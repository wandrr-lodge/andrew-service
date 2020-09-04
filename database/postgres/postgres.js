/* eslint-disable no-console */
const { Client } = require('pg');
const config = require('./db_postgres_config');

const client = new Client(config);

// await client.connect();
// const res = await client.query(query);
// await client.end();
