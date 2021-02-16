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

export type SetRoundCountType = {
  type: typeof TYPES.SET_ROUND_COUNT,
  value: number
}
export function setRoundCount(value: number): SetRoundCountType {
  return {
    type: TYPES.SET_ROUND_COUNT,
    value
  }
}

export type SetBigBreakNumberType = {
  type: typeof TYPES.SET_BIG_BREAK_NUMBER,
  value: number
}
export function setBigBreakNumber(value: number): SetBigBreakNumberType {
  return {
    type: TYPES.SET_BIG_BREAK_NUMBER,
    value
  }
}

export type SetWorkTimeType = {
  type: typeof TYPES.SET_WORK_TIME,
  value: number
}
export function setWorkTime(value: number): SetWorkTimeType {
  return {
    type: TYPES.SET_WORK_TIME,
    value
  }
}

export type SetBreakTimeType = {
  type: typeof TYPES.SET_BREAK_TIME,
  value: number
}
export function setBreakTime(value: number): SetBreakTimeType {
  return {
    type: TYPES.SET_BREAK_TIME,
    value
  }
}

export type SetLongBreakTimeType = {
  type: typeof TYPES.SET_LONG_BREAK_TIME,
  value: number
}
export function setLongBreakTime(value: number): SetLongBreakTimeType {
  return {
    type: TYPES.SET_LONG_BREAK_TIME,
    value
  }
}

export type SetDefaultSettingsType = {
  type: typeof TYPES.SET_DEFAULT_SETTINGS,
}
export function setDefaultSettings(): SetDefaultSettingsType {
  return {
    type: TYPES.SET_DEFAULT_SETTINGS,
  }
}

export type SettingsActions = OnSetSoundActionType | SetRoundCountType | SetBigBreakNumberType | SetWorkTimeType | SetBreakTimeType | SetLongBreakTimeType | SetDefaultSettingsType;
