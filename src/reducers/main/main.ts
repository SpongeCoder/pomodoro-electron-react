import { MainActions } from './actions';

export interface MainState {
  isShowSettings: boolean,
  isPlay: boolean,

}

const defaultState: MainState = {
  isShowSettings: false,
  isPlay: true
}

export function mainReducer(state = defaultState, action: MainActions) {
  switch (action.type) {
    case 'ON_SET_SHOW_SETTINGS':
      return {
        ...state,
        isShowSettings: action.value
      }
    case 'ON_SET_IS_PLAY':
      return {
        ...state,
        isPlay: action.value
      }

    default:
      return state;
  }
}
