$(document).ready( () => {

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg';

  const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/asantos3026/cj01ninbe00012rml9jjb8bjj', //stylesheet location
      center: [-122.208515, 37.779505], // starting position
      zoom: 9 // starting zoom
  });

})


