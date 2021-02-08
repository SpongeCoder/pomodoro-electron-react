import { Action/* , Dispatch */ } from 'redux';

export const ON_SET_SHOW_SETTINGS = 'ON_SET_SHOW_SETTINGS';
export const ON_SET_IS_PLAY = 'ON_SET_IS_PLAY';

export interface IOnSetShowSettings extends Action {
  type: typeof ON_SET_SHOW_SETTINGS,
  value: boolean
}
export function onSetShowSettings(value: boolean): IOnSetShowSettings {
  return {
    type: ON_SET_SHOW_SETTINGS,
    value
  }
}

export interface IOnSetIsPlay extends Action {
  type: typeof ON_SET_IS_PLAY,
  value: boolean
}
export function onSetIsPlay(value: boolean): IOnSetIsPlay {
  return {
    type: ON_SET_IS_PLAY,
    value
  }
}

export type MainActions = IOnSetShowSettings | IOnSetIsPlay;


/* export function actionOnSetShowSettings(value: boolean) {
  return (dispatch: Dispatch) => {
    return dispatch(onSetShowSettings(value));
  };
} */
