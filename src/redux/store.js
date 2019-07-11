import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import rootSaga from './sagas';

export const history = createBrowserHistory();
const initialState = {};
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
});

middleware.push(loggerMiddleware);

const composedEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers(history),
  initialState,
  composedEnhancers(applyMiddleware(...middleware), ...enhancers)
);

sagaMiddleware.run(rootSaga);

export default store;
