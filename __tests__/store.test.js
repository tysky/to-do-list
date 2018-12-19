import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { uniqueId } from 'lodash';
import reducers from '../src/reducers';
import * as actions from '../src/actions';

const initialState = {
  tasks: {},
  tasksFetchingState: 'none',
  taskSendingState: 'none',
  taskEditingState: 'none',
  taskDeletingState: 'none',
  newTaskInputText: '',
};

const getNextId = () => Number(uniqueId());

const makeTask = (text, taskIndex, status = 'todo') => ({
  id: getNextId(),
  text,
  status,
  taskIndex,
});
const task1 = makeTask('test task1', 1);
const task2 = makeTask('test task2', 2);

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
      taskEditingState: 'none',
      taskDeletingState: 'none',
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
        taskIndex: 1,
      },
    });

    store.dispatch(actions.newTaskFetched(task2));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'todo',
        taskIndex: 1,
      },
      2: {
        id: 2,
        text: 'test task2',
        status: 'todo',
        taskIndex: 2,
      },
    });
  });

  test('should change status of the existing task', () => {
    store.dispatch(actions.newTaskFetched(task1));
    store.dispatch(actions.newTaskFetched(task2));
    store.dispatch(actions.taskEdited({
      id: 1, status: 'completed', text: 'test task1', taskIndex: 1,
    }));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'completed',
        taskIndex: 1,
      },
      2: {
        id: 2,
        text: 'test task2',
        status: 'todo',
        taskIndex: 2,
      },
    });
    store.dispatch(actions.taskEdited({
      id: 2, status: 'completed', text: 'test task2', taskIndex: 2,
    }));
    store.dispatch(actions.taskEdited({
      id: 1, status: 'todo', text: 'test task1', taskIndex: 1,
    }));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'todo',
        taskIndex: 1,
      },
      2: {
        id: 2,
        text: 'test task2',
        status: 'completed',
        taskIndex: 2,
      },
    });
  });

  test('should edit task text', () => {
    store.dispatch(actions.newTaskFetched(task1));
    store.dispatch(actions.taskEdited({
      id: 1, status: 'todo', text: 'new task text', taskIndex: 1,
    }));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'new task text',
        status: 'todo',
        taskIndex: 1,
      },
    });
  });

  test('should delete task', () => {
    store.dispatch(actions.newTaskFetched(task1));
    store.dispatch(actions.newTaskFetched(task2));
    store.dispatch(actions.taskDeleted(1));
    expect(store.getState().tasks).toEqual({
      2: {
        id: 2,
        text: 'test task2',
        status: 'todo',
        taskIndex: 2,
      },
    });
    store.dispatch(actions.taskDeleted(2));
    expect(store.getState().tasks).toEqual({ });
  });
  test('should change tasks order', () => {
    store.dispatch(actions.newTaskFetched(task1));
    store.dispatch(actions.newTaskFetched(task2));
    const task3 = makeTask('test task3', 3);
    store.dispatch(actions.newTaskFetched(task3));

    // task with id === 3 dragging to first position(should be task3->task1->task2)
    store.dispatch(actions.changeTasksOrder({ srcIndex: 3, destIndex: 1 }));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'todo',
        taskIndex: 2,
      },
      2: {
        id: 2,
        text: 'test task2',
        status: 'todo',
        taskIndex: 3,
      },
      3: {
        id: 3,
        text: 'test task3',
        status: 'todo',
        taskIndex: 1,
      },
    });

    // task with id === 1 dragging to third position (should be task3->task2->task1)
    store.dispatch(actions.changeTasksOrder({ srcIndex: 2, destIndex: 3 }));
    expect(store.getState().tasks).toEqual({
      1: {
        id: 1,
        text: 'test task1',
        status: 'todo',
        taskIndex: 3,
      },
      2: {
        id: 2,
        text: 'test task2',
        status: 'todo',
        taskIndex: 2,
      },
      3: {
        id: 3,
        text: 'test task3',
        status: 'todo',
        taskIndex: 1,
      },
    });
  });
});
