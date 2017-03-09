$(document).ready( () => {

  // const MapboxClient = require('mapbox');
  // const client = new MapboxClient('pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg');

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg';

  const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v10', //stylesheet location
      center: [-122.208515, 37.779505], // starting position
      zoom: 9 // starting zoom
  });

  const markerHeight = 50, markerRadius = 10, linearOffset = 25;
  const popupOffsets = {
   'top': [0, 0],
   'top-left': [0,0],
   'top-right': [0,0],
   'bottom': [0, -markerHeight],
   'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
   'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
   'left': [markerRadius, (markerHeight - markerRadius) * -1],
   'right': [-markerRadius, (markerHeight - markerRadius) * -1]
   };
  const popup = new mapboxgl.Popup({offset:popupOffsets})
    .setLngLat([-122.208515, 37.779505])
    .setHTML("<h1>Mel's Project!</h1>")
    .addTo(map);


})


