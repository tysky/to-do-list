import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../src/reducers';
import * as actions from '../src/actions';

const initialState = {
  tasks: {},
  tasksFetchingState: 'none',
  taskSendingState: 'none',
  newTaskInputText: '',
};

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
    const task1 = {
      id: 1, text: 'test task1',
    };
    store.dispatch(actions.newTaskFetched(task1));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
      },
    });

    const task2 = {
      id: 2, text: 'test task2',
    };
    store.dispatch(actions.newTaskFetched(task2));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
      },
      2: {
        id: 2,
        text: 'test task2',
      },
    });
  });
});
