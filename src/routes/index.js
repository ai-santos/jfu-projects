import express from 'express'
import database from '../public/database'

const router = express.Router()
const db = require('../public/database')

router.get('/api/projects', db.getAllProjects);

module.exports = router;