const express = require('express');

const getRouter = () => {
  const apiRouter = express.Router();

  apiRouter.get('/', (req, res) => {
    res.send('Hello api!');
  });

  return apiRouter;
};

module.exports = getRouter();
