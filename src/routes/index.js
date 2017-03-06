import express from 'express'
import db from '../public/database'

const router = express.Router()
// const db = require('../public/database')

router.get('/api/projects', db.getAllProjects);
router.get('/api/projects/:id', db.getSingleProject);
router.post('/api/projects', db.createProject);
router.put('/api/projects/:id', db.updateProject);
router.delete('/api/projects/:id', db.removeProject);

module.exports = router;


