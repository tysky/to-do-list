import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const initFetchTasksRequest = createAction('TASKS_INIT_FETCH_REQUEST');
export const initFetchTasksSuccess = createAction('TASKS_INIT_FETCH_SUCCESS');
export const initFetchTasksFailure = createAction('TASKS_INIT_FETCH_FAILURE');

export const initFetchTasks = () => async (dispatch) => {
  dispatch(initFetchTasksRequest());
  try {
    const url = routes.tasksUrl();
    const response = await axios.get(url);
    dispatch(initFetchTasksSuccess(response.data.tasks));
  } catch (e) {
    dispatch(initFetchTasksSuccess());
  }
};

export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');

export const addTasksRequest = createAction('TASKS_ADD_REQUEST');
export const addTasksSuccess = createAction('TASKS_ADD_SUCCESS');
export const addTasksFailure = createAction('TASKS_ADD_FAILURE');

export const addTask = task => async (dispatch) => {
  dispatch(addTasksRequest());
  try {
    const url = routes.tasksUrl();
    await axios.post(url, { task });
    dispatch(addTasksSuccess());
  } catch (e) {
    dispatch(addTasksFailure());
  }
};

export const newTaskFetched = createAction('TASKS_FETCHED');
export const taskEdited = createAction('TASK_EDITED');

export const editTaskRequest = createAction('TASK_EDIT_REQUEST');
export const editTaskSuccess = createAction('TASK_EDIT_SUCCESS');
export const editTaskFailure = createAction('TASK_EDIT_FAILURE');

export const editTask = task => async (dispatch) => {
  dispatch(editTaskRequest());
  try {
    const url = routes.taskUrl(task.id);
    await axios.patch(url, { task });
    dispatch(editTaskSuccess());
  } catch (e) {
    dispatch(editTaskFailure());
  }
};
