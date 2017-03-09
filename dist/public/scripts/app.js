'use strict';

$(document).ready(function () {

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg';

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v10', //stylesheet location
    center: [-122.208515, 37.779505], // starting position
    zoom: 9 // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  }));

  var markerHeight = 50,
      markerRadius = 10,
      linearOffset = 25;
  var popupOffsets = {
    'top': [0, 0],
    'top-left': [0, 0],
    'top-right': [0, 0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
  };
  var popup = new mapboxgl.Popup({ offset: popupOffsets }).setLngLat([-122.17345, 37.806771]).setHTML("<img src='http://i.imgur.com/XTcPWf9t.jpg'></img>").addTo(map);
});