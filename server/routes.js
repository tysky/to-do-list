const express = require('express');

const tasks = {
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
