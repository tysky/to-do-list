const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const http = require('http');
const apiRoutes = require('./routes');

const getServer = () => {
  const app = express();

  const logger = morgan('tiny');
  app.use(logger);
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '..', 'dist')));

  const server = http.createServer(app);
  const io = socket(server);
  app.use('/api/v1', apiRoutes(io));

  return server;
};

module.exports = getServer;
