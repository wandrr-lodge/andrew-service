CREATE DATABASE IF NOT EXISTS reviewservice;

USE reviewservice;

CREATE TABLE IF NOT EXISTS hostels (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  hostel_name VARCHAR(64) UNIQUE
);

CREATE TABLE IF NOT EXISTS authors (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(64),
  name VARCHAR(64) UNIQUE,
  age_group INT,
  picture_url TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  hostel_id INT NOT NULL,
  author_id INT NOT NULL,
  description VARCHAR(255),
  security INT NOT NULL,
  location INT NOT NULL,
  staff INT NOT NULL,
  atmosphere INT NOT NULL,
  cleanliness INT NOT NULL,
  facilities INT NOT NULL,
  value INT NOT NULL,
  total INT NOT NULL,
  created_at DATE NOT NULL,
  FOREIGN KEY (hostel_id) REFERENCES hostels(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
)

