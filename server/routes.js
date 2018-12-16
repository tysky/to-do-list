const express = require('express');
const uniqueId = require('lodash/uniqueId');

const tasks = {};

const getNextId = () => Number(uniqueId());

const getRouter = (io) => {
  const apiRouter = express.Router();
  apiRouter.get('/', (req, res) => {
    res.send('Hello api!');
  });
  apiRouter.get('/tasks', (req, res) => {
    res.send({ tasks });
  });
  apiRouter.post('/tasks', (req, res) => {
    const { task } = req.body;
    const taskId = getNextId();
    const newTask = { ...task, id: taskId, status: 'todo' };
    tasks[taskId] = newTask;
    io.emit('newTask', newTask);
    res.status(201).end();
  });
  apiRouter.patch('/tasks/:id', (req, res) => {
    const { task } = req.body;
    tasks[task.id] = { ...tasks[task.id], ...task };
    io.emit('taskEdited', tasks[task.id]);
    res.status(204).end();
  });

  return apiRouter;
};

module.exports = getRouter;
