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
}, {});

export default combineReducers({
  tasks,
  tasksFetchingState,
});
