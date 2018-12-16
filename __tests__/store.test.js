import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { uniqueId } from 'lodash';
import reducers from '../src/reducers';
import * as actions from '../src/actions';

const initialState = {
  tasks: {},
  tasksFetchingState: 'none',
  taskSendingState: 'none',
  newTaskInputText: '',
};

const getNextId = () => Number(uniqueId());

const makeTask = (text, status = 'todo') => ({
  id: getNextId(),
  text,
  status,
});
const task1 = makeTask('test task1');
const task2 = makeTask('test task2');

describe('Store', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducers, initialState, applyMiddleware(thunk));
  });

  test('should match initial state', () => {
    expect(store.getState()).toEqual({
      tasks: {},
      tasksFetchingState: 'none',
      taskSendingState: 'none',
      newTaskInputText: '',
    });
  });

  test('should add new task', () => {
    store.dispatch(actions.newTaskFetched(task1));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'todo',
      },
    });

    store.dispatch(actions.newTaskFetched(task2));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'todo',
      },
      2: {
        id: 2,
        text: 'test task2',
        status: 'todo',
      },
    });
  });

  test('should change status of the existing task', () => {
    store.dispatch(actions.newTaskFetched(task1));
    store.dispatch(actions.newTaskFetched(task2));
    store.dispatch(actions.taskEdited({ id: 1, status: 'done' }));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'done',
      },
      2: {
        id: 2,
        text: 'test task2',
        status: 'todo',
      },
    });
    store.dispatch(actions.taskEdited({ taskId: 2, status: 'done' }));
    store.dispatch(actions.taskEdited({ taskId: 1, status: 'todo' }));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'todo',
      },
      2: {
        id: 2,
        text: 'test task2',
        status: 'done',
      },
    });
  });
});
