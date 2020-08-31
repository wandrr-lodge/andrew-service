/* eslint-disable no-console */
const { Client } = require('pg');
const config = require('./db_postgres_config');

const client = new Client(config);

(async () => {
  await client.connect();

  const res = await client.query('SELECT * FROM hostels');
  console.log('response:', res.rows);
  await client.end();
})();
