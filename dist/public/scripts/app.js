'use strict';

$(document).ready(function () {
  var map = new ol.Map({
    target: 'map',
    layers: [new ol.layer.Tile({
      source: new ol.source.OSM()
    })],
    view: new ol.View({
      center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
      zoom: 10
    })
  });

  map.getView().setCenter(ol.proj.transform([-122.208515, 37.779505], 'EPSG:4326', 'EPSG:3857'));
});