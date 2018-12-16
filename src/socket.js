import io from 'socket.io-client';
import { newTaskFetched, taskEdited, taskDeleted } from './actions';

export default (store) => {
  const socket = io();
  socket.on('newTask', ((newTask) => {
    store.dispatch(newTaskFetched(newTask));
  }));
  socket.on('taskEdited', ((task) => {
    store.dispatch(taskEdited(task));
  }));
  socket.on('taskDeleted', ((taskId) => {
    store.dispatch(taskDeleted(taskId));
  }));
};
