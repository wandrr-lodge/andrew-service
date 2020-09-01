/* eslint-disable no-console */
const { Client } = require('pg');
const config = require('./db_postgres_config');

const client = new Client(config);


(async () => {
  await client.connect();

  const res = await client.query("INSERT INTO hostels (id, hostel_name) VALUES (3, 'hostel3'), (4, 'hostel4');");
  console.log('response:', res);
  await client.end();
})();
