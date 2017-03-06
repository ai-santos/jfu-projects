import express from 'express'
import database from '../public/database'

const router = express.Router()
const db = require('../public/database')

router.get('/api/projects', db.getAllProjects)
router.get('/api/projects/:id', db.getSingleProject);
router.post('/api/projects', db.createProject);

module.exports = router;