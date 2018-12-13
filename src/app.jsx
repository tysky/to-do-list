import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import { fetchTasks } from './actions';

export default () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );

  store.dispatch(fetchTasks());

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
  );
};
