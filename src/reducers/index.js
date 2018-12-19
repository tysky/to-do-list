import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { omit } from 'lodash';
import * as actions from '../actions';
import changeTasksOrder from '../../lib/changeTasksOrder';


const tasksFetchingState = handleActions({
  [actions.initFetchTasksRequest]() {
    return 'requested';
  },
  [actions.initFetchTasksSuccess]() {
    return 'succeed';
  },
  [actions.initFetchTasksFailure]() {
    return 'failed';
  },
}, 'none');

const taskSendingState = handleActions({
  [actions.addTasksRequest]() {
    return 'requested';
  },
  [actions.addTasksSuccess]() {
    return 'succeed';
  },
  [actions.addTasksFailure]() {
    return 'failed';
  },
}, 'none');

const taskEditingState = handleActions({
  [actions.editTaskRequest]() {
    return 'requested';
  },
  [actions.editTaskSuccess]() {
    return 'succeed';
  },
  [actions.editTaskFailure]() {
    return 'failed';
  },
}, 'none');

const taskDeletingState = handleActions({
  [actions.deleteTaskRequest]() {
    return 'requested';
  },
  [actions.deleteTaskSuccess]() {
    return 'succeed';
  },
  [actions.deleteTaskFailure]() {
    return 'failed';
  },
}, 'none');

const tasks = handleActions({
  [actions.initFetchTasksSuccess](state, { payload }) {
    return payload;
  },
  [actions.newTaskFetched](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.taskEdited](state, { payload }) {
    return {
      ...state,
      [payload.id]: payload,
    };
  },
  [actions.tasksEdited](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [actions.taskDeleted](state, { payload }) {
    return omit(state, payload);
  },
  [actions.changeTasksOrder](state, { payload: { srcIndex, destIndex } }) {
    return { ...state, ...changeTasksOrder(state, srcIndex, destIndex) };
  },
}, {});

const newTaskInputText = handleActions({
  [actions.addTasksSuccess]() {
    return '';
  },
  [actions.updateNewTaskText](state, { payload: { text } }) {
    return text;
  },
}, '');

export default combineReducers({
  tasks,
  tasksFetchingState,
  taskSendingState,
  taskEditingState,
  taskDeletingState,
  newTaskInputText,
});
