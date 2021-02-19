import { SettingsActions } from './actions';
import * as TYPES from './constants';

export type TimeType = {
  work: number,
  small: number,
  big: number
}

export type SettingsState = {
  time: TimeType,
  roundCount: number,
  roundBigBreakNumber: number,
  isSoundOff: boolean
}

const defaultState: SettingsState = {
  time: {
    work: 10,
    small: 5,
    big: 8
  },
  roundCount: 8,
  roundBigBreakNumber: 4,
  isSoundOff: false
}

export function settingsReducer(state = defaultState, action: SettingsActions): SettingsState {
  switch (action.type) {
    case TYPES.ON_SET_SOUND:
      return {
        ...state,
        isSoundOff: action.value
      }

    case TYPES.SET_ROUND_COUNT:
      return {
        ...state,
        roundCount: action.value
      }

    case TYPES.SET_BIG_BREAK_NUMBER:
      return {
        ...state,
        roundBigBreakNumber: action.value
      }

    case TYPES.SET_WORK_TIME:
      return {
        ...state,
        time: {
          ...state.time,
          work: action.value
        }
      }

    case TYPES.SET_BREAK_TIME:
      return {
        ...state,
        time: {
          ...state.time,
          small: action.value
        }
      }

    case TYPES.SET_LONG_BREAK_TIME:
      return {
        ...state,
        time: {
          ...state.time,
          big: action.value
        }
      }

    case TYPES.SET_DEFAULT_SETTINGS:
      return defaultState

    default:
      return state;
  }
}
