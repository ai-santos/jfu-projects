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

// router.post('/api/projects', (request, response, next) => {
//   db.getSingleProject()
//     .then( projects => response.render())
// })


// router.get('/api/projects', db.getAllProjects);
// router.get('/api/projects/:id', db.getSingleProject);
// router.post('/api/projects', db.createProject);
// router.put('/api/projects/:id', db.updateProject);
// router.delete('/api/projects/:id', db.removeProject);

module.exports = router;


