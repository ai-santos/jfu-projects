const promise = require('bluebird')
const options = {
  promiseLib: promise
}

const databaseName = 'jfu_projects'
const pgp = require('pg-promise')(options)
const connectionString = `postgres://@localhost:5432/${databaseName}`
const db = pgp(connectionString)

//refactor database functions to handle only database calls
const getAllProjects = () => {return db.any('SELECT * FROM projects')}

//get a single project
const getSingleProject = (projID) => {
  return db.one( 'SELECT * FROM projects WHERE id=$1', [projID] )
}

//add a project
const createProject = (attributes) => {
  const sql =
    `INSERT INTO projects (name, address, city, state, zip, phone, email, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING
      *`

  const variables = [
    attributes.name,
    attributes.address,
    attributes.city,
    attributes.state,
    attributes.zip,
    attributes.phone,
    attributes.email,
    attributes.description
  ]
  return db.one(sql, variables)
}

//update a project
const updateProject = (id, attributes) => {
  attributes.id = parseInt(id)
  attributes.zip = parseInt(attributes.zip)
  attributes.phone = parseInt(attributes.phone)
  console.log(attributes)
  const sql =
  `UPDATE
    projects
  SET
    name=$1,
    address=$2,
    city=$3,
    state=$4,
    zip=$5,
    phone=$6,
    email=$7,
    description=$8
  WHERE
    id=$9`

  const variables = [
    attributes.name,
    attributes.address,
    attributes.city,
    attributes.state,
    attributes.zip,
    attributes.phone,
    attributes.email,
    attributes.description,
    attributes.id
  ]

  console.log('FIND ME!!!', variables)
  return db.none(sql, variables)
}

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
const removeProject = (projID) => {return db.none('DELETE FROM projects WHERE id=$1', [projID] )}



// function removeProject(req, res, next) {
//   const projID = parseInt(req.params.id)
//   db.result('delete from projects where id=$1', projID)
//     .then(function(result){
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Removed ${result.rowCount} project`
//         })
//     })
//     .catch(function(err) {
//       return next(err)
//     })
// }

module.exports = { getAllProjects: getAllProjects, getSingleProject: getSingleProject, createProject: createProject, updateProject: updateProject, removeProject: removeProject }