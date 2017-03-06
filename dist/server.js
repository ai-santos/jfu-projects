'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

//middleware
server.use(_express2.default.static(__dirname + '/public'));
server.set('view engine', 'ejs');

// middleware
server.use((0, _morgan2.default)('dev'));

//routes
server.use('/', _routes2.default);

server.listen(process.env.PORT || 8080);