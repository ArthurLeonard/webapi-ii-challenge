const express = require('express'); // import express NEED TO ADD IT TO YARN TOO
const db = require('./data/db.js');   // import database file

const userRouter = require('./router.js')


const server = express();           // create server object

server.use(express.json());         // to allow server to work with json format

server.get('/', (req, res) => { res.send('Hello Mom!') } );


module.exports = server;




server.use('/api/users', userRouter);