import { createStore } from 'redux';
import { throttle } from 'lodash';
import { rootReducer } from './reducers';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

export const store = createStore(rootReducer, persistedState);

store.subscribe(throttle(() => {
  saveState({
    settings: store.getState().settings
  })
}, 1000));
