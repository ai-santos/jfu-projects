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

// router.get( '/projects', (request, response, next) => {
//   db.getAllProjects()
//     .then( projects => response.render('home', { projects }) )
//     .catch( error => next( error ) )
// })

router.get('/projects/:proj_id', function (request, response, next) {
  var proj_id = request.params.proj_id;

  _database2.default.getSingleProject(proj_id).then(function (project) {
    return response.render('project/show', { project: project });
  }).catch(function (error) {
    return next(error);
  });
});

router.post('/projects', function (request, response, next) {
  _database2.default.createProject(request.body.project).then(function (projId) {
    response.redirect('/projects/' + projId);
  }).catch(function (error) {
    return next(error);
  });
});

router.get('/projects/edit/:proj_id', function (request, response, next) {
  console.trace('trace me');
  var proj_id = request.params.proj_id;

  _database2.default.getSingleProject(proj_id).then(function (project) {
    response.render('project/edit', { project: project });
  }).catch(function (error) {
    console.log('our request object ----->', request.params);
    return next(error);
  });
});

router.post('/projects/edit/:proj_id', function (request, response, next) {
  var projId = request.params.proj_id;
  console.log('this is our request body', projId);
  _database2.default.updateProject(projId, request.body.project).then(function () {
    response.redirect('/projects/' + projId);
  }).catch(function (error) {
    return next(error);
  });
});

router.get('/projects/delete/:proj_id', function (request, response, next) {
  var proj_id = request.params.proj_id;

  _database2.default.removeProject(proj_id).then(function () {
    response.redirect('/');
  }).catch(function (error) {
    return next(error);
  });
});

module.exports = router;