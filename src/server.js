import express from 'express'
import routes from './routes'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'

const server = express()

//middleware
server.use(express.static(__dirname+'/public'))
server.set('view engine', 'ejs');

// middleware
server.use(logger('dev'))
server.use(bodyParser.urlencoded({extended: true}));

//routes
server.use('/', routes)

server.listen(process.env.PORT || 8080)
