const promise = require('bluebird')
const options = {
  promiseLib: promise
}

const databaseName = 'jfu_projects'
const pgp = require('pg-promise')(options)
const connectionString = process.env.DATABASE_URL || `postgres://@localhost:5432/${databaseName}`
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

//delete a project
const removeProject = (projID) => {return db.none('DELETE FROM projects WHERE id=$1', [projID] )}

const searchProjects = (keywords) => {
  const variables = []
  let sql = `
    SELECT
      DISTINCT *
    FROM
      projects
  `
  if(keywords.search_query) {
    console.log('our keywords', keywords)
    let search_query = keywords.search_query
      .toLowerCase()
      .replace(/^ */, '%')
      .replace(/ *$/, '%')
      .replace(/ +/g, '%')

    variables.push(search_query)
    console.log('our search query-->', search_query)
    sql +=`
      WHERE
        LOWER(projects.name) LIKE $1
      OR
        LOWER(projects.description) LIKE $1
      OR
        LOWER(projects.city) LIKE $1
    `
  }
  return db.any(sql, variables)
}

module.exports = { getAllProjects: getAllProjects, getSingleProject: getSingleProject, createProject: createProject, updateProject: updateProject, removeProject: removeProject, searchProjects: searchProjects }