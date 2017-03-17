'use strict';

$(document).ready(function () {
  var vectorSource = new ol.source.Vector({});
  var makePins = function makePins(coordinates) {
    return coordinates.map(function (coordinate) {
      return makeSinglePin(coordinate);
    });
  };

  var makeSinglePin = function makeSinglePin(coordinate) {
    return new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([coordinate.lng, coordinate.lat], 'EPSG:4326', 'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });
  };

  //create the style
  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon( /** @type {olx.style.IconOptions} */{
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.75,
      src: 'https://www.pragueeventscalendar.com/src/templates/images/web/marker_icon.png'
    })
  });
  //add the feature vector to the layer vector, and apply a style to whole layer
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
  });

  var map = new ol.Map({
    target: 'map',
    layers: [new ol.layer.Tile({
      source: new ol.source.OSM()
    }), vectorLayer],
    view: new ol.View({
      center: ol.proj.transform([-122.208515, 37.779505], 'EPSG:4326', 'EPSG:3857'),
      zoom: 10
    })
  });

  var addProjectsToMap = function addProjectsToMap(serialData) {
    $.get('/api/projects', function (allProjects) {
      var pinsArray = makePins(allProjects);
      pinsArray.map(function (pin) {
        vectorSource.addFeature(pin);
      });
    });
  };
  addProjectsToMap();

  // const getSearchCoords = () => {
  //   $.get('/search-projects', (projects) => {
  //       return projects.map( (project) => {
  //         let coords = {}
  //         const lat = project.lat
  //         const lng = project.lng
  //         coords.latitude = lat
  //         coords.longitude = lng
  //         console.log(coords)
  //       })
  //   })
  // }

  // const zoomToBounds = (searchData) => {
  //   //store current and search location's long and lat
  //   const currentLoc = [90.208515, 47.779505]
  //   const searchLoc = [-112.208515, 27.779505]

  //   //set a bounding box between the current Location and the search location
  //   let boundsExtent = new ol.extent.boundingExtent([searchLoc, currentLoc])

  //   //transform coordinates from WGS to EPSG
  //   boundsExtent = ol.proj.transformExtent(boundsExtent, ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'))
  //   console.log('these are our bounds-->', boundsExtent)

  //   const zoomToExtentControl = new ol.control.ZoomToExtent({
  //     extent: boundsExtent
  //   })
  // }

  // map.addControl(zoomToExtentControl)
  // const controls = map.getControls()
  // let attributionControl
  // controls.forEach( (el) => {
  //   console.log(el instanceof ol.control.Attribution)
  //   if(el instanceof ol.control.Attribution) {
  //     attributionControl = el
  //   }
  // })
  // map.removeControl(attributionControl)
});