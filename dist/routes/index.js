'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../public/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var db = require('../public/database');

router.get('/api/projects', db.getAllProjects);

module.exports = router;