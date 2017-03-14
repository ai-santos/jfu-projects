// mapboxgl.accessToken = 'pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg';

// const map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: 'mapbox://styles/mapbox/streets-v10', //stylesheet location
//     center: [-122.208515, 37.779505], // starting position
//     zoom: 9 // starting zoom
// });

// const geocoder = new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken

// });

// document.getElementById('geocoder').appendChild(geocoder.onAdd(map))
// // map.addControl(new mapboxgl.NavigationControl());
// const getAllMyProjects = (serialData) => {
//   $.get('/api/projects', (data) => {
//       let allProjects = data
//       // console.log(data)

//       for(let index in data) {
//         let address = data[index].address.toString()
//         let state = data[index].state.toString()
//         let city = data[index].city.toString()
//         let zip = data[index].zip.toString()

//         let entireAddress = [address + ' ' + state + ' ' + city + ',' +zip]
//         console.log(entireAddress.join(''))
//         // geocoder.query(entireAddress, (err, result) => {
//         //   console.log('this is our result--->', result)
//         // })
//       }
//   })
// }
// getAllMyProjects()
//
// -------------------------------------------------------------------------
// Pop Up Marker
// // mapboxgl.accessToken = 'pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg';

  // const map = new mapboxgl.Map({
  //     container: 'map', // container id
  //     style: 'mapbox://styles/mapbox/streets-v10', //stylesheet location
  //     center: [-122.208515, 37.779505], // starting position
  //     zoom: 9 // starting zoom
  // });

  // const geocoder = new MapboxGeocoder({
  //   accessToken: mapboxgl.accessToken

  // });

  // document.getElementById('geocoder').appendChild(geocoder.onAdd(map))
  // // map.addControl(new mapboxgl.NavigationControl());
  // const getAllMyProjects = (serialData) => {
  //   $.get('/api/projects', (data) => {
  //       let allProjects = data
  //       // console.log(data)

  //       for(let index in data) {
  //         let address = data[index].address.toString()
  //         let state = data[index].state.toString()
  //         let city = data[index].city.toString()
  //         let zip = data[index].zip.toString()

  //         let entireAddress = [address + ' ' + state + ' ' + city + ',' +zip]
  //         console.log(entireAddress.join(''))
  //         // geocoder.query(entireAddress, (err, result) => {
  //         //   console.log('this is our result--->', result)
  //         // })
  //       }
  //   })
  // }
  // getAllMyProjects()

