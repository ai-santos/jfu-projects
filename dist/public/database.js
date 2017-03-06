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
      message: 'Retrieved ALL projects'
    });
  }).catch(function (err) {
    return next(err);
  });
}

//get a single project
function getSingleProject(req, res, next) {
  var projID = parseInt(req.params.id);
  db.one('select * from projects where id = $1', projID).then(function (data) {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE project'
    });
  }).catch(function (err) {
    return next(err);
  });
}

function createProject(req, res, next) {
  db.none('insert into projects(id, name, address, city, state, zip, phone, email)' + 'values(${id}, ${name}, ${address}, ${city}, ${state}, ${zip}, ${phone}, ${email})', req.body).then(function () {
    res.status(200).json({
      status: 'success',
      message: 'Inserted one project'
    });
  }).catch(function (err) {
    return next(err);
  });
}

//create a new project
// const createProject = (project_name, address, city, state, zip, phone, email) => {
//   `INSERT INTO
//     projects (project_name, address, city, state, zip, phone, email)
//   VALUES
//     ($1, $2, $3, $4, $5, $6, $7)
//   RETURNING
//     *
//   `
//   const attributes = [
//     project_name,
//     address,
//     city,
//     state,
//     zip,
//     phone,
//     email
//   ]
//   return db.one(sql, attributes)
// }

module.exports = { getAllProjects: getAllProjects, getSingleProject: getSingleProject, createProject: createProject };