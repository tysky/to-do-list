import io from 'socket.io-client';
import { newTaskFetched } from './actions';

export default (store) => {
  const socket = io();
  socket.on('newTask', ((newTask) => {
    store.dispatch(newTaskFetched(newTask));
  }));
};
