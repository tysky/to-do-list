import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Task from '../src/components/Task';
import reducers from '../src/reducers';

const task = {
  id: 1,
  status: 'todo',
  taskIndex: 1,
  text: 'task text',
};
const initialState = {
  tasks: {},
  tasksFetchingState: 'none',
  taskSendingState: 'none',
  newTaskInputText: '',
};

const store = createStore(reducers, initialState);
test('NewTaskInput', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Task task={task} />
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
