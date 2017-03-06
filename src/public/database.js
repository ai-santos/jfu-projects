const promise = require('bluebird')
const options = {
  promiseLib: promise
}

const databaseName = 'jfu_projects'
const pgp = require('pg-promise')(options)
const connectionString = `postgres://@localhost:5432/${databaseName}`
const db = pgp(connectionString)

//get all projects
function getAllProjects(req, res, next) {
  db.any('select * from projects')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL projects'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//get a single project
function getSingleProject(req, res, next) {
  let projID = parseInt(req.params.id);
  db.one('select * from projects where id = $1', projID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE project'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//add a project
function createProject(req, res, next) {
  const {id, name, address, city, state, zip, phone, email} = req.body
  db.none('insert into projects(id, name, address, city, state, zip, phone, email)' +
  'values($1, $2, $3, $4, $5, $6, $7, $8)', [id, name, address, city, state, zip, phone, email])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one project'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//update a project
function updateProject(req, res, next) {
  const {id, name, address, city, state, zip, phone, email} = req.body
  return db.oneOrNone('update projects set name=$1, address=$2, city=$3, state=$4, zip=$5, phone=$6, email=$7', [id, name, address, city, state, zip, phone, email])
  .then(function () {
    res.status(200)
      .json({
        status: 'success',
        message: 'Updated one project'
      });
  })
  .catch(function (err) {
    return next(err)
  })
}

//delete a project
function removeProject(req, res, next) {
  const projID = parseInt(req.params.id)
  db.result('delete from projects where id=$1', projID)
    .then(function(result){
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} project`
        })
    })
    .catch(function(err) {
      return next(err)
    })
}

module.exports = { getAllProjects: getAllProjects, getSingleProject: getSingleProject, createProject: createProject, updateProject: updateProject, removeProject: removeProject }