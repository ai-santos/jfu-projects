'use strict';

var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var databaseName = 'jfu_projects';
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://@localhost:5432/' + databaseName;
var db = pgp(connectionString);

//refactor database functions to handle only database calls
var getAllProjects = function getAllProjects() {
  return db.any('select * from projects');
};

//get a single project
var getSingleProject = function getSingleProject(projID) {
  return db.one('select * from projects where id=$1', [projID]);
};

//add a project
var createProject = function createProject(attributes) {
  var sql = 'INSERT INTO projects (name, address, city, state, zip, phone, email, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n     RETURNING\n      *';

  var variables = [attributes.name, attributes.address, attributes.city, attributes.state, attributes.zip, attributes.phone, attributes.email, attributes.description];
  return db.one(sql, variables);
};

//update a project
var updateProject = function updateProject(attributes) {
  var sql = 'UPDATE\n    todos\n  SET\n    name=$1\n    address=$2\n    city=$3\n    state=$4\n    zip=$5\n    phone=$6\n    email=$7\n    description=$8\n  WHERE\n    id=$1';

  var variables = [attributes.name, attributes.address, attributes.city, attributes.state, attributes.zip, attributes.phone, attributes.email, attributes.description];
  return db.none(sql, variables);
};

// function updateProject(req, res, next) {
//   const {id, name, address, city, state, zip, phone, email} = req.body
//   return db.oneOrNone('update projects set name=$1, address=$2, city=$3, state=$4, zip=$5, phone=$6, email=$7', [id, name, address, city, state, zip, phone, email])
//   .then(function () {
//     res.status(200)
//       .json({
//         status: 'success',
//         message: 'Updated one project'
//       });
//   })
//   .catch(function (err) {
//     return next(err)
//   })
// }

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