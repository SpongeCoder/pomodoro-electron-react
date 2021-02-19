import { MainActions } from './actions';
import * as TYPES from './constants';

export type TimeTypeType = 'work' | 'small' | 'big';

export type MainState = {
  isShowSettings: boolean,
  isPlay: boolean,
  typeTime: TimeTypeType,
  currentRound: number
}

const defaultState: MainState = {
  isShowSettings: false,
  isPlay: false,
  typeTime: 'work',
  currentRound: 1
}

export function mainReducer(state = defaultState, action: MainActions): MainState {
  switch (action.type) {
    case TYPES.ON_SET_SHOW_SETTINGS:
      return {
        ...state,
        isShowSettings: action.value
      }
    case TYPES.ON_SET_IS_PLAY:
      return {
        ...state,
        isPlay: action.value
      }
    case TYPES.ON_CHANGE_TYPE_TIME:
      return {
        ...state,
        typeTime: action.value
      }
    case TYPES.ON_SET_CURRENT_ROUND:
      return {
        ...state,
        currentRound: action.value
      }

    default:
      return state;
  }
}
