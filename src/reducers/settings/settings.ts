import { SettingsActions } from './actions';
import * as TYPES from './constants';

export type SettingsState = {
  time: {
    work: number,
    small: number,
    big: number
  },
  roundCount: number,
  roundBigBreakNumber: number,
  isSoundOff: boolean
}

const defaultState: SettingsState = {
  time: {
    work: 27,
    small: 9,
    big: 18
  },
  roundCount: 8,
  roundBigBreakNumber: 4,
  isSoundOff: false
}

export function settingsReducer(state = defaultState, action: SettingsActions) {
  switch (action.type) {
    case TYPES.ON_SET_SOUND:
      return {
        ...state,
        isSoundOff: action.value
      }

    default:
      return state;
  }
}
