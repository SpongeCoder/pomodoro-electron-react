import { Action } from 'redux';

export const ON_SET_SOUND = 'ON_SET_SOUND';

export interface IOnSetSound extends Action {
  type: 'ON_SET_SOUND',
  value: boolean
}
export function onSetSound(value: boolean): IOnSetSound {
  return {
    type: ON_SET_SOUND,
    value
  }
}

export type SettingsActions = IOnSetSound;

