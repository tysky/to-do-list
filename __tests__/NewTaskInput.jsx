import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import NewTaskInput from '../src/components/NewTaskInput';
import reducers from '../src/reducers';

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
      <NewTaskInput />
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
