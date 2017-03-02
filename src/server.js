import express from 'express'

const server = express()

//middleware
server.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 8080)