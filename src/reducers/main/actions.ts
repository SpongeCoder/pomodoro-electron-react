import { Action } from 'redux';
import * as TYPES from './constants';

export interface IOnSetShowSettings extends Action {
  type: typeof TYPES.ON_SET_SHOW_SETTINGS,
  value: boolean
}
export function onSetShowSettings(value: boolean): IOnSetShowSettings {
  return {
    type: TYPES.ON_SET_SHOW_SETTINGS,
    value
  }
}

export interface IOnSetIsPlay extends Action {
  type: typeof TYPES.ON_SET_IS_PLAY,
  value: boolean
}
export function onSetIsPlay(value: boolean): IOnSetIsPlay {
  return {
    type: TYPES.ON_SET_IS_PLAY,
    value
  }
}


export type ChangeTimeTypeActionType = {
  type: typeof TYPES.ON_CHANGE_TYPE_TIME,
  value: 'work' | 'small' | 'big'
}
export function onChangeTimeType(value: 'work' | 'small' | 'big'): ChangeTimeTypeActionType {
  return {
    type: TYPES.ON_CHANGE_TYPE_TIME,
    value
  }
}

export type MainActions = IOnSetShowSettings | IOnSetIsPlay | ChangeTimeTypeActionType;


/* export function actionOnSetShowSettings(value: boolean) {
  return (dispatch: Dispatch) => {
    return dispatch(onSetShowSettings(value));
  };
} */
