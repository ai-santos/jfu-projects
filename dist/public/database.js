'use strict';

var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var databaseName = 'jfu_projects';
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://@localhost:5432/' + databaseName;
var db = pgp(connectionString);

//get all projects
function getAllProjects(req, res, next) {
  db.any('select * from projects').then(function (data) {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL puppies'
    });
  }).catch(function (err) {
    return next(err);
  });
}

//create a new project
var createProject = function createProject(project_name, address, city, state, zip, phone, email) {
  'INSERT INTO\n    projects (project_name, address, city, state, zip, phone, email)\n  VALUES\n    ($1, $2, $3, $4, $5, $6, $7)\n  RETURNING\n    *\n  ';
  var attributes = [project_name, address, city, state, zip, phone, email];
  return db.one(sql, attributes);
};

module.exports = { getAllProjects: getAllProjects, createProject: createProject };