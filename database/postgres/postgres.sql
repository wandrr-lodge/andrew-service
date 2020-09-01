DROP DATABASE IF EXISTS reviewservice;

CREATE DATABASE reviewservice;
\c reviewservice;

DROP TABLE IF EXISTS hostels;
CREATE TABLE hostels (
  id INTEGER PRIMARY KEY,
  hostel_name VARCHAR(30) UNIQUE
);

DROP TABLE IF EXISTS authors;
CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  authdescription VARCHAR(64),
  name VARCHAR(64),
  gender VARCHAR(10),
  age_group VARCHAR(64)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  review_id INTEGER PRIMARY KEY,
  hostel_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  description VARCHAR(500),
  date VARCHAR(10) NOT NULL,
  security NUMERIC(3,1) NOT NULL,
  location NUMERIC(3,1) NOT NULL,
  staff NUMERIC(3,1) NOT NULL,
  atmosphere NUMERIC(3,1) NOT NULL,
  cleanliness NUMERIC(3,1) NOT NULL,
  facilities NUMERIC(3,1) NOT NULL,
  value NUMERIC(3,1) NOT NULL,
  total NUMERIC(3,1) NOT NULL,
  FOREIGN KEY (hostel_id) REFERENCES hostels(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

COPY hostels
FROM '/Users/andrew/Documents/HackReactor/SDC/Reviews-Service/database/data/hostels.csv'
DELIMITER ','
CSV HEADER;

COPY authors
FROM '/Users/andrew/Documents/HackReactor/SDC/Reviews-Service/database/data/authors.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/Users/andrew/Documents/HackReactor/SDC/Reviews-Service/database/data/reviews.csv'
DELIMITER ','
CSV HEADER;