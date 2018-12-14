import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import { initFetchTasks } from './actions';
import addListeners from './socket';


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
  addListeners(store);
  store.dispatch(initFetchTasks());

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
  );
};
