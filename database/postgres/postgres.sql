DROP DATABASE IF EXISTS reviewservice;

CREATE DATABASE reviewservice;
\c reviewservice;

DROP TABLE IF EXISTS hostels;
CREATE TABLE hostels (
  id SERIAL PRIMARY KEY,
  hostel_name VARCHAR(30) UNIQUE
);

DROP TABLE IF EXISTS authors;
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  age_group VARCHAR(64),
  gender VARCHAR(10),
  authdescription VARCHAR(64)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  hostel_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  description VARCHAR(500),
  date VARCHAR(10) NOT NULL,
  security FLOAT(1) NOT NULL,
  location FLOAT(1) NOT NULL,
  staff FLOAT(1) NOT NULL,
  atmosphere FLOAT(1) NOT NULL,
  cleanliness FLOAT(1) NOT NULL,
  facilities FLOAT(1) NOT NULL,
  value FLOAT(1) NOT NULL,
  total FLOAT(1) NOT NULL,
  FOREIGN KEY (hostel_id) REFERENCES hostels(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

COPY hostels
FROM '/home/ubuntu/hostels_1000.csv'
DELIMITER ','
CSV HEADER;

COPY authors
FROM '/home/ubuntu/authors_50.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/home/ubuntu/reviews_5048.csv'
DELIMITER ','
CSV HEADER;