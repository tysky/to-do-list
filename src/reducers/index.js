import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
// import { keyBy } from 'lodash';
import * as actions from '../actions';


const tasksFetchingState = handleActions({
  [actions.fetchTasksRequest]() {
    return 'requested';
  },
  [actions.fetchTasksFailure]() {
    return 'failed';
  },
  [actions.fetchTasksSuccess]() {
    return 'successed';
  },
}, 'none');

const tasks = handleActions({
  [actions.fetchTasksSuccess](state, { payload }) {
    return payload.tasks;
  },
  [actions.addTask](state, { payload: { task } }) {
    return { ...state, [task.id]: task };
  },
}, {});

const newTaskInputText = handleActions({
  [actions.addTask]() {
    return '';
  },
  [actions.updateNewTaskText](state, { payload: { text } }) {
    return text;
  },
}, '');

export default combineReducers({
  tasks,
  tasksFetchingState,
  newTaskInputText,
});
