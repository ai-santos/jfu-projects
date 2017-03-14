"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

geocoder = require('../index.js');

module.exports = {

  setUp: function setUp(cb) {
    geocoder.selectProvider("geonames", { "username": "npmunittests" });
    cb();
  },

  testExposeGeocodeFunction: function testExposeGeocodeFunction(test) {
    test.equal(_typeof(geocoder.geocode), 'function');
    test.equal(geocoder.provider, 'geonames');
    test.done();
  },

  // Uses "geonames"
  testReverseGeocode: function testReverseGeocode(test) {
    return require('./geocoder-google-test.js').testReverseGeocode(test);
  },

  // Uses "address"
  testReverseGeocodeGoogleplex: function testReverseGeocodeGoogleplex(test) {
    return require('./geocoder-google-test.js').testReverseGeocodeGoogleplex(test);
  }

};