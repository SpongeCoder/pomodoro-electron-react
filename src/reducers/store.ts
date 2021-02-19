import { createStore } from 'redux';
import { throttle } from 'lodash';
import { rootReducer } from './reducers';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

export const store = createStore(rootReducer, persistedState);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
// window.__store__ = store;

store.subscribe(throttle(() => {
  saveState({
    settings: store.getState().settings
  })
}, 1000));
