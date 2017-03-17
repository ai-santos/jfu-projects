$(document).ready( () => {
  const vectorSource = new ol.source.Vector({})
  const makePins = (coordinates) => {
    return coordinates.map((coordinate) => {
      return makeSinglePin(coordinate)
    })
  }

  const makeSinglePin = (coordinate) => {
    return new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([coordinate.lng, coordinate.lat], 'EPSG:4326',   'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    })
  }

  //create the style
  const iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.75,
      src: 'https://www.pragueeventscalendar.com/src/templates/images/web/marker_icon.png'
    }))
  })
   //add the feature vector to the layer vector, and apply a style to whole layer
  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
  })

  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }), vectorLayer
    ],
    view: new ol.View({
      center: ol.proj.transform([-122.208515, 37.779505], 'EPSG:4326', 'EPSG:3857'),
      zoom: 10
    })
  })

  const addProjectsToMap = (serialData) => {
    $.get('/api/projects', (allProjects) => {
      let pinsArray = makePins(allProjects)
      pinsArray.map((pin) => {
        vectorSource.addFeature(pin)
      })
    })
  }
  addProjectsToMap()

  const zoomToExtentControl = new ol.control.ZoomToExtent({
    extent: [-11243808.051695308, 4406397.202710291, -4561377.290892059, 6852382.107835932]
  })

  map.addControl(zoomToExtentControl)
  const controls = map.getControls()
  let attributionControl
  controls.forEach( (el) => {
    console.log(el instanceof ol.control.Attribution)
    if(el instanceof ol.control.Attribution) {
      attributionControl = el
    }
  })
  map.removeControl(attributionControl)

})


