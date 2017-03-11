'use strict';

$(document).ready(function () {

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg';

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v10', //stylesheet location
    center: [-122.208515, 37.779505], // starting position
    zoom: 9 // starting zoom
  });

  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken

  });

  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  // map.addControl(new mapboxgl.NavigationControl());
  var getAllMyProjects = function getAllMyProjects(serialData) {
    $.get('/api/projects', function (data) {
      var allProjects = data;
      // console.log(data)

      for (var index in data) {
        var address = data[index].address.toString();
        var state = data[index].state.toString();
        var city = data[index].city.toString();
        var zip = data[index].zip.toString();

        var entireAddress = [address + ' ' + state + ' ' + city + ',' + zip];
        console.log(entireAddress.join(''));
        // geocoder.query(entireAddress, (err, result) => {
        //   console.log('this is our result--->', result)
        // })
      }
    });
  };
  getAllMyProjects();
});