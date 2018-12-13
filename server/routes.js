const express = require('express');

const tasks = {
  1: { id: 1, text: 'Buy some food' },
  2: { id: 2, text: 'Cook the soup' },
  3: { id: 3, text: 'Read new book' },
};

const getRouter = () => {
  const apiRouter = express.Router();

  apiRouter.get('/', (req, res) => {
    res.send('Hello api!');
  });
  apiRouter.get('/tasks', (req, res) => {
    res.send({ tasks });
  });

  return apiRouter;
};

module.exports = getRouter();
