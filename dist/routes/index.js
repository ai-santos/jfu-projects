'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _geocoder = require('geocoder');

var _geocoder2 = _interopRequireDefault(_geocoder);

var _database = require('../public/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var allMyProjects = {};

var parseAddress = function parseAddress(projects) {
  var listOfAddresses = [];
  for (var index in projects) {
    var address = projects[index].address.toString();
    var state = projects[index].state.toString();
    var city = projects[index].city.toString();
    var zip = projects[index].zip.toString();

    var parsedAddress = [address + ' ' + city + ' ' + state + ' ,' + zip];
    var addressToGeocode = parsedAddress.join('');
    listOfAddresses.push(addressToGeocode);
  }
  return listOfAddresses;
};

var geocoderPromise = function geocoderPromise(address) {
  return new Promise(function (resolve, reject) {
    return _geocoder2.default.geocode(address, function (err, data) {
      resolve(data);
    });
  });
};

var parseGeocodes = function parseGeocodes(geocodes) {
  var activeGeocodes = geocodes.filter(function (geocode) {
    if (geocode.error_message) {
      return false;
    }
    return geocode;
  });
  return activeGeocodes.map(function (obj) {
    return obj.results[0].geometry.location;
  });
};

//refactor database functions to only make database calls
router.get('/', function (request, response, next) {
  _database2.default.getAllProjects().then(function (projects) {
    return response.render('home', { projects: projects });
  }).catch(function (error) {
    return next(error);
  });
});

router.get('/api/projects', function (request, response, next) {
  _database2.default.getAllProjects().then(function (projects) {
    return parseAddress(projects);
  }).then(function (addresses) {
    return addresses.map(geocoderPromise);
  }).then(function (geocodePromises) {
    Promise.all(geocodePromises)

    //call a function that maps over geocodes and returns an array of latLongs
    .then(function (geocodes) {
      response.send(parseGeocodes(geocodes));
    });
  }).catch(function (error) {
    response.send(error);
  });
});

router.get('/projects/:proj_id', function (request, response, next) {
  var proj_id = request.params.proj_id;

  _database2.default.getSingleProject(proj_id).then(function (project) {
    return response.render('project/show', { project: project });
  }).catch(function (error) {
    return next(error);
  });
});

router.post('/projects', function (request, response, next) {
  console.log('getting ready to post');
  _database2.default.createProject(request.body.project).then(function (project) {
    response.redirect('/projects/' + project.id);
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

router.post('/search-projects', function (request, response) {
  console.log('our request', request.body);
  var searchKeywords = {
    search_query: request.body.search_query
  };

  _database2.default.searchProjects(searchKeywords).then(function (projects) {
    return response.json(projects);
  }).catch(function (error) {
    return next(error);
  });
});

module.exports = router;