import express from 'express'
import geocoder from 'geocoder'
import db from '../public/database'

const router = express.Router()
// const db = require('../public/database')
const allMyProjects = {}

const parseAddress = (projects) => {
  const listOfAddresses = []
  for(let index in projects) {
    let address = projects[index].address.toString()
    let state = projects[index].state.toString()
    let city = projects[index].city.toString()
    let zip = projects[index].zip.toString()

    let parseAddress = [address + ' ' + city + ' ' + state + ' ,' + zip ]
    let addressToGeocode = parseAddress.join('')
    listOfAddresses.push(addressToGeocode)
  }
  console.log('list of address-->', listOfAddresses)
  return listOfAddresses
}

const geocoderPromise = (address) => {
  console.log('addres-->', address)
  return new Promise((resolve, reject) => {
    return geocoder.geocode(address, (err, data) => {
      console.log('data', data)
      resolve(data)
    })
  })
}

//refactor database functions to only make database calls
router.get( '/', (request, response, next) => {
  db.getAllProjects()
    .then( projects => response.render('home', { projects }) )
    .catch( error => next( error ) )
})

router.get('/api/projects', (request, response, next) => {
  db.getAllProjects()
    .then( projects => parseAddress(projects))
    .then( addresses => addresses.map(geocoderPromise))
    .then(geocodePromises => {
      Promise.all(geocodePromises)
        .then(geocodes => response.json(geocodes))
    }).catch(error => {console.log('error', error); response.send(error)})
})

// router.get('/api/projects', (request, response, next) => {
//   db.getAllProjects()
//     .then( projects => response.send(projects))
//     .catch( error => next( error ) )
// })

// router.get( '/projects', (request, response, next) => {
//   db.getAllProjects()
//     .then( projects => response.render('home', { projects }) )
//     .catch( error => next( error ) )
// })

router.get('/projects/:proj_id', (request, response, next) => {
  const { proj_id } = request.params
  db.getSingleProject(proj_id)
    .then( project => response.render('project/show', { project }) )
    .catch ( error => next( error ))
})

router.post('/projects', (request, response, next) => {
  console.log('getting ready to post')
  db.createProject(request.body.project)
    .then((project) => {
      response.redirect(`/projects/${project.id}`)
    })
    .catch( error => next( error ) )
})

router.get('/projects/edit/:proj_id', (request, response, next) => {
  console.trace('trace me')
  const { proj_id } = request.params
  db.getSingleProject(proj_id)
    .then( project => {
      response.render('project/edit', { project })
    })
    .catch( (error) => {
      console.log('our request object ----->', request.params)
      return next( error )
    })
})

router.post('/projects/edit/:proj_id', (request, response, next) => {
  const  projId  = request.params.proj_id
  console.log('this is our request body', projId)
  db.updateProject(projId, request.body.project)
    .then(() => {
      response.redirect(`/projects/${projId}`)
    })
    .catch( error => next( error ))
})

router.get('/projects/delete/:proj_id', (request, response, next) => {
  const { proj_id } = request.params
  db.removeProject(proj_id)
    .then(() => {
      response.redirect('/')
    })
    .catch( error => next ( error ))
})

module.exports = router;


