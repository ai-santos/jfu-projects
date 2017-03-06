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
  phone VARCHAR(255),
  email VARCHAR(255)
);

INSERT INTO projects (id, name, address, city, state, zip, phone, email)
  VALUES (1, 'nature', '1625 woolsey street', 'berkeley', 'ca', 94703, 5102346789, 'a@a.com');
