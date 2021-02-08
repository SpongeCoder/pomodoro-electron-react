import { SettingsActions } from './actions';
import * as TYPES from './constants';

export type SettingsState = {
  workTime: number,
  smallBreakTime: number,
  bigBreakTime: number,
  roundCount: number,
  roundBigBreakNumber: number,
  isSoundOff: boolean
}

const defaultState: SettingsState = {
  workTime: 2700, // 45 min
  smallBreakTime: 900, // 15 min
  bigBreakTime: 1800, // 30 min
  roundCount: 6,
  roundBigBreakNumber: 2,
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
