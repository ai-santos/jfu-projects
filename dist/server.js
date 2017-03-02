'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

//middleware
server.use(_express2.default.static(__dirname + '/public'));

server.listen(process.env.PORT || 8080);