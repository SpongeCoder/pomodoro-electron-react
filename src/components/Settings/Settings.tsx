import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MainState } from '../../reducers/main/main';
import { SettingsState } from '../../reducers/settings/settings';
import {
  setRoundCount,
  setBigBreakNumber,
  setWorkTime,
  setBreakTime,
  setLongBreakTime,
  setDefaultSettings
} from '../../reducers/settings/actions';
import { clockView } from '../../shared/ClockView';
import './Settings.scss';

function Settings() {
  const isShow = useSelector((state: { main: MainState }) => state.main.isShowSettings);
  const roundBigBreakNumber = useSelector((state: { settings: SettingsState }) => state.settings.roundBigBreakNumber);
  const roundCount = useSelector((state: { settings: SettingsState }) => state.settings.roundCount);
  const workTime = useSelector((state: { settings: SettingsState }) => state.settings.time.work);
  const smallTime = useSelector((state: { settings: SettingsState }) => state.settings.time.small);
  const bigTime = useSelector((state: { settings: SettingsState }) => state.settings.time.big);
  const dispatch = useDispatch();

  let cn = 'settings';
  if (isShow) {
    cn += ' is-show';
  }

  const onChangeRound = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as unknown as number
    dispatch(setRoundCount(value))
  }

  const onChangeWorkTime = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as unknown as number
    dispatch(setWorkTime(value))
  }

  const onChangeSmallTime = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as unknown as number
    dispatch(setBreakTime(value))
  }

  const onChangeBigTime = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as unknown as number
    dispatch(setLongBreakTime(value))
  }

  const onClickDefault = () => {
    dispatch(setDefaultSettings())
  }


  return (
    <div className={cn}>
      <h3>Настройки</h3>
      <div className="settings-input">
        <div className="settings-input__title">Work</div>
        <div className="settings-input__value">{clockView(workTime)}</div>
        <input type="range" min="60" step="60" max="5400" value={workTime} onChange={onChangeWorkTime}/>
      </div>
      <div className="settings-input">
        <div className="settings-input__title">Short break</div>
        <div className="settings-input__value">{clockView(smallTime)}</div>
        <input type="range" min="60" step="60" max="3600" value={smallTime} onChange={onChangeSmallTime}/>
      </div>
      <div className="settings-input">
        <div className="settings-input__title">Long break</div>
        <div className="settings-input__value">{clockView(bigTime)}</div>
        <input type="range" min="60" step="60" max="3600" value={bigTime} onChange={onChangeBigTime}/>
      </div>
      <div className="settings-input">
        <div className="settings-input__title">Rounds</div>
        <div className="settings-input__value">{roundCount}</div>
        <input type="range" min="1" max="20" value={roundCount} onChange={onChangeRound}/>
      </div>

      <div className="settings-input">
        <button type="button" onClick={onClickDefault}>Reset Defaults</button>
      </div>
    </div>
  )
}

export default React.memo(Settings);
