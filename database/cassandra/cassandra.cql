DROP KEYSPACE IF EXISTS reviewservice;

CREATE KEYSPACE reviewservice
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE reviewservice;

CREATE TABLE reviews (
  review_id INT PRIMARY KEY,
  hostel_id INT,
  author_id INT,
  description VARCHAR,
  date VARCHAR,
  security FLOAT,
  location FLOAT,
  staff FLOAT,
  atmosphere FLOAT,
  cleanliness FLOAT,
  facilities FLOAT,
  value FLOAT,
  total FLOAT,
);
-k reviewservice

dsbulk load -url "/Users/andrew/Documents/HackReactor/SDC/Reviews-Service/database/data/historicalData/reviews_5048.csv" -t reviews -header true -logDir "/logs";

"review_id=review_id,hostel_id=hostel_id,author_id=author_id,description=description,date=date,security=security,location=location,staff=staff,atmosphere=atmosphere,cleanliness=cleanliness,facilities=facilities,value=value,total=total"

dsbulk load -url /Users/andrew/Documents/HackReactor/SDC/Reviews-Service/database/data/historicalData/reviews_50209.csv -k reviewservice -t reviews -header true -logDir logs/;

dsbulk load -url /Users/andrew/Documents/HackReactor/SDC/Reviews-Service/database/data/reviews.csv -k reviewservice -t reviews -header true -logDir logs/;