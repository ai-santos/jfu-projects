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

//add a project
function createProject(req, res, next) {
  var _req$body = req.body,
      id = _req$body.id,
      name = _req$body.name,
      address = _req$body.address,
      city = _req$body.city,
      state = _req$body.state,
      zip = _req$body.zip,
      phone = _req$body.phone,
      email = _req$body.email;

  db.none('insert into projects(id, name, address, city, state, zip, phone, email)' + 'values($1, $2, $3, $4, $5, $6, $7, $8)', [id, name, address, city, state, zip, phone, email]).then(function () {
    res.status(200).json({
      status: 'success',
      message: 'Inserted one project'
    });
  }).catch(function (err) {
    return next(err);
  });
}

//update a project
function updateProject(req, res, next) {
  var _req$body2 = req.body,
      id = _req$body2.id,
      name = _req$body2.name,
      address = _req$body2.address,
      city = _req$body2.city,
      state = _req$body2.state,
      zip = _req$body2.zip,
      phone = _req$body2.phone,
      email = _req$body2.email;

  return db.oneOrNone('update projects set name=$1, address=$2, city=$3, state=$4, zip=$5, phone=$6, email=$7', [id, name, address, city, state, zip, phone, email]).then(function () {
    res.status(200).json({
      status: 'success',
      message: 'Updated one project'
    });
  }).catch(function (err) {
    return next(err);
  });
}

//delete a project
function removeProject(req, res, next) {
  var projID = parseInt(req.params.id);
  db.result('delete from projects where id=$1', projID).then(function (result) {
    res.status(200).json({
      status: 'success',
      message: 'Removed ' + result.rowCount + ' project'
    });
  }).catch(function (err) {
    return next(err);
  });
}

module.exports = { getAllProjects: getAllProjects, getSingleProject: getSingleProject, createProject: createProject, updateProject: updateProject, removeProject: removeProject };