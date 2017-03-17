'use strict';

var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var databaseName = 'jfu_projects';
var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://@localhost:5432/' + databaseName;
var db = pgp(connectionString);

//refactor database functions to handle only database calls
var getAllProjects = function getAllProjects() {
  return db.any('SELECT * FROM projects');
};

//get a single project
var getSingleProject = function getSingleProject(projID) {
  return db.one('SELECT * FROM projects WHERE id=$1', [projID]);
};

//add a project
var createProject = function createProject(attributes) {
  var sql = 'INSERT INTO projects (name, address, city, state, zip, phone, email, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n     RETURNING\n      *';

  var variables = [attributes.name, attributes.address, attributes.city, attributes.state, attributes.zip, attributes.phone, attributes.email, attributes.description];
  return db.one(sql, variables);
};

//update a project
var updateProject = function updateProject(id, attributes) {
  attributes.id = parseInt(id);
  attributes.zip = parseInt(attributes.zip);
  attributes.phone = parseInt(attributes.phone);
  console.log(attributes);
  var sql = 'UPDATE\n    projects\n  SET\n    name=$1,\n    address=$2,\n    city=$3,\n    state=$4,\n    zip=$5,\n    phone=$6,\n    email=$7,\n    description=$8\n  WHERE\n    id=$9';

  var variables = [attributes.name, attributes.address, attributes.city, attributes.state, attributes.zip, attributes.phone, attributes.email, attributes.description, attributes.id];

  console.log('FIND ME!!!', variables);
  return db.none(sql, variables);
};

//delete a project
var removeProject = function removeProject(projID) {
  return db.none('DELETE FROM projects WHERE id=$1', [projID]);
};

var searchProjects = function searchProjects(keywords) {
  var variables = [];
  var sql = '\n    SELECT\n      DISTINCT *\n    FROM\n      projects\n  ';
  if (keywords.search_query) {
    console.log('our keywords', keywords);
    var search_query = keywords.search_query.toLowerCase().replace(/^ */, '%').replace(/ *$/, '%').replace(/ +/g, '%');

    variables.push(search_query);
    console.log('our search query-->', search_query);
    sql += '\n      WHERE\n        LOWER(projects.name) LIKE $1\n      OR\n        LOWER(projects.description) LIKE $1\n      OR\n        LOWER(projects.city) LIKE $1\n    ';
  }
  return db.any(sql, variables);
};

module.exports = { getAllProjects: getAllProjects, getSingleProject: getSingleProject, createProject: createProject, updateProject: updateProject, removeProject: removeProject, searchProjects: searchProjects };