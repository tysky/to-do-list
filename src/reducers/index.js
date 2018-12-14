import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';


const tasksFetchingState = handleActions({
  [actions.initFetchTasksRequest]() {
    return 'requested';
  },
  [actions.initFetchTasksSuccess]() {
    return 'failed';
  },
  [actions.initFetchTasksFailure]() {
    return 'successed';
  },
}, 'none');

const tasks = handleActions({
  [actions.initFetchTasksSuccess](state, { payload }) {
    return payload;
  },
  [actions.newTaskFetched](state, { payload }) {
    return { ...state, [payload.id]: payload };
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
  newTaskInputText,
});
