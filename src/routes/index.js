import express from 'express'
import db from '../public/database'

const router = express.Router()
// const db = require('../public/database')

//refactor database functions to only make database calls
router.get( '/', (request, response, next) => {
  db.getAllProjects()
    .then( projects => response.render('home', { projects }) )
    .catch( error => next( error ) )
})

// router.get( '/projects', (request, response, next) => {
//   db.getAllProjects()
//     .then( projects => response.render('home', { projects }) )
//     .catch( error => next( error ) )
// })

router.get('/projects/:proj_id', (request, response, next) => {
  const { proj_id } = request.params
  db.getSingleProject(proj_id)
    .then( project => response.render('project/show', { project }) )
    .catch ( error => next( error ))
})

router.post('/projects', (request, response, next) => {
  console.log('getting ready to post')
  db.createProject(request.body.project)
    .then((project) => {
      response.redirect(`/projects/${project.id}`)
    })
    .catch( error => next( error ) )
})

router.get('/projects/edit/:proj_id', (request, response, next) => {
  console.trace('trace me')
  const { proj_id } = request.params
  db.getSingleProject(proj_id)
    .then( project => {
      response.render('project/edit', { project })
    })
    .catch( (error) => {
      console.log('our request object ----->', request.params)
      return next( error )
    })
})

router.post('/projects/edit/:proj_id', (request, response, next) => {
  const  projId  = request.params.proj_id
  console.log('this is our request body', projId)
  db.updateProject(projId, request.body.project)
    .then(() => {
      response.redirect(`/projects/${projId}`)
    })
    .catch( error => next( error ))
})

router.get('/projects/delete/:proj_id', (request, response, next) => {
  const { proj_id } = request.params
  db.removeProject(proj_id)
    .then(() => {
      response.redirect('/')
    })
    .catch( error => next ( error ))
})

module.exports = router;


