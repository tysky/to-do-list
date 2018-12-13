import axios from 'axios';
import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';
import routes from '../routes';

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const url = routes.tasksUrl();
    const response = await axios.get(url);
    dispatch(fetchTasksSuccess({ tasks: response.data.tasks }));
  } catch (e) {
    dispatch(fetchTasksFailure());
  }
};

export const addTask = createAction('TASK_ADD', task => ({ task: { ...task, id: uniqueId() } }));
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
