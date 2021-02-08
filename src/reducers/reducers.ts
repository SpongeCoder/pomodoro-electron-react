import { combineReducers } from 'redux'
import { mainReducer } from './main/main';
import { settingsReducer } from './settings/settings';

export const rootReducer = combineReducers({
  main: mainReducer,
  settings: settingsReducer,
});
