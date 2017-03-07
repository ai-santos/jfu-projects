'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

//middleware
server.set('views', _path2.default.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// middleware
server.use((0, _morgan2.default)('dev'));
server.use(_express2.default.static(_path2.default.join(__dirname + '/public')));
server.use(_bodyParser2.default.urlencoded({ extended: true }));

//routes
server.use('/', _index2.default);

server.listen(process.env.PORT || 8080);

module.exports = server;