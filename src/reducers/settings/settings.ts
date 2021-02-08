import { SettingsActions } from './actions';

export interface SettingsState {
  workTime: number,
  smallBreakTime: number,
  bigBreakTime: number,
  roundCount: number,
  roundBigBreakNumber: number,
  isSoundOff: boolean
}

const defaultState: SettingsState = {
  workTime: 45,
  smallBreakTime: 15,
  bigBreakTime: 30,
  roundCount: 6,
  roundBigBreakNumber: 2,
  isSoundOff: false
}

export function settingsReducer(state = defaultState, action: SettingsActions) {
  switch (action.type) {
    case 'ON_SET_SOUND':
      return {
        ...state,
        isSoundOff: action.value
      }

    default:
      return state;
  }
}
