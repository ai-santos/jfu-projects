'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../public/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// const db = require('../public/database')

//refactor database functions to only make database calls
router.get('/', function (request, response, next) {
  _database2.default.getAllProjects().then(function (projects) {
    return response.render('home', { projects: projects });
  }).catch(function (error) {
    return next(error);
  });
});

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