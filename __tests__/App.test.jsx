
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import App from '../src/components/App';
import reducers from '../src/reducers';

const initialState = {
  tasks: {},
  tasksFetchingState: 'none',
  taskSendingState: 'none',
  newTaskInputText: '',
};

const store = createStore(reducers, initialState);

test('App', () => {
  const component = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
