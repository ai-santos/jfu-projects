'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../public/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// const db = require('../public/database')

router.get('/api/projects', _database2.default.getAllProjects);
router.get('/api/projects/:id', _database2.default.getSingleProject);
router.post('/api/projects', _database2.default.createProject);
router.put('/api/projects/:id', _database2.default.updateProject);
router.delete('/api/projects/:id', _database2.default.removeProject);

module.exports = router;