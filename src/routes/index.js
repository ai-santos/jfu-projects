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
  db.createProject(request.body.project)
    .then((projId) => {
      response.redirect(`/projects/${projId.id}`)
    })
    .catch( error => next( error ) )
})

router.get('/projects/:proj_id/edit', (request, response, next) => {
  db.getSingleProject(proj_id)
    .then( edit => {
      const book = edit[0]
      response.render('project/edit', { project })
    })
    .catch( error => next( error ) )
})

router.post('/projects/:proj_id', (request, response, next) => {
  const { projId } = request.params
  db.updateBook(projId, request.body.project)
    .then(() => {
      response.redirect(`/projects/${projId.id}`)
    })
    .catch( error => next( error ))
})

// router.put('/api/projects/:id', db.updateProject);
// router.delete('/api/projects/:id', db.removeProject);

module.exports = router;


