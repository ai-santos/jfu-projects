DROP DATABASE IF EXISTS jfu_projects;
CREATE DATABASE jfu_projects;

\c jfu_projects;

CREATE TABLE projects(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip VARCHAR(255),
  phone VARCHAR,
  email VARCHAR(255),
  description TEXT
);

INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('nature', '1625 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'a@a.com', 'Lorem');

INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('me', '1650 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'b@b.com', 'Lorem');

INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('me', '1650 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'c@c.com', 'Lorem');

INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('me', '1650 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'c@c.com', 'Lorem');

INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('me', '1650 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'c@c.com', 'Lorem');


INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('me', '1650 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'c@c.com', 'Lorem');

INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('me', '1650 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'c@c.com', 'Lorem');

INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('me', '1650 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'c@c.com', 'Lorem');

INSERT INTO projects (name, address, city, state, zip, phone, email, description)
  VALUES ('me', '1650 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'c@c.com', 'Lorem');