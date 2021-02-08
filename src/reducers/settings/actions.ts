import * as TYPES from './constants';

export type OnSetSoundActionType = {
  type: typeof TYPES.ON_SET_SOUND,
  value: boolean
}

export function onSetSound(value: boolean): OnSetSoundActionType {
  return {
    type: TYPES.ON_SET_SOUND,
    value
  }
}

export type SettingsActions = OnSetSoundActionType;
