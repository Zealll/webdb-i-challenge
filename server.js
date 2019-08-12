const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

const accountRoutes = require('./routers/Router.js')


server.use(express.json());

server.use('/api/accounts', accountRoutes)

module.exports = server;