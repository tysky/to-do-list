import io from 'socket.io-client';
import {
  newTaskFetched, taskEdited, tasksEdited, taskDeleted,
} from './actions';

const socket = io();
export default (store) => {
  socket.on('newTask', ((newTask) => {
    store.dispatch(newTaskFetched(newTask));
  }));
  socket.on('taskEdited', ((task) => {
    store.dispatch(taskEdited(task));
  }));
  socket.on('taskDeleted', ((taskId) => {
    store.dispatch(taskDeleted(taskId));
  }));
  socket.on('tasksOrderChanged', (tasks) => {
    store.dispatch(tasksEdited(tasks));
  });
};
export const sendTasksOrder = (tasks) => {
  socket.emit('order', tasks);
};
