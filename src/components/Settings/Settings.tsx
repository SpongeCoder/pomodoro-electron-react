import React from 'react';
import ReactSlider from 'react-slider';
import { Scrollbars } from 'react-custom-scrollbars';
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

  const onChangeRound = (value: number | number[] | null | undefined) => {
    dispatch(setRoundCount(value as number));
  }

  const onChangeWorkTime = (value: number | number[] | null | undefined) => {
    dispatch(setWorkTime(value as number));
  }

  const onChangeSmallTime = (value: number | number[] | null | undefined) => {
    dispatch(setBreakTime(value as number));
  }

  const onChangeBigTime = (value: number | number[] | null | undefined) => {
    dispatch(setLongBreakTime(value as number));
  }

  const onChangeRoundBigBreakNumber = (value: number | number[] | null | undefined) => {
    dispatch(setBigBreakNumber(value as number));
  }

  const onClickDefault = () => {
    dispatch(setDefaultSettings())
  }

  return (
    <div className={cn}>
      <Scrollbars className="scrollbar">
        <div className="settings-input">
          <div className="settings-input__title">Work</div>
          <div className="settings-input__value">{clockView(workTime)}</div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="horizontal-slider-thumb"
            trackClassName="horizontal-slider-track"
            min={60}
            max={5400}
            step={60}
            value={workTime}
            onChange={onChangeWorkTime}
          />
        </div>
        <div className="settings-input">
          <div className="settings-input__title">Short break</div>
          <div className="settings-input__value">{clockView(smallTime)}</div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="horizontal-slider-thumb"
            trackClassName="horizontal-slider-track"
            min={60}
            max={3600}
            step={60}
            value={smallTime}
            onChange={onChangeSmallTime}
          />
        </div>
        <div className="settings-input">
          <div className="settings-input__title">Long break</div>
          <div className="settings-input__value">{clockView(bigTime)}</div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="horizontal-slider-thumb"
            trackClassName="horizontal-slider-track"
            min={60}
            max={3600}
            step={60}
            value={bigTime}
            onChange={onChangeBigTime}
          />
        </div>
        <div className="settings-input">
          <div className="settings-input__title">Rounds</div>
          <div className="settings-input__value">{roundCount}</div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="horizontal-slider-thumb"
            trackClassName="horizontal-slider-track"
            min={1}
            max={20}
            value={roundCount}
            onChange={onChangeRound}
          />
        </div>
        <div className="settings-input">
          <div className="settings-input__title">Long Break Round</div>
          <div className="settings-input__value">{roundBigBreakNumber}</div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="horizontal-slider-thumb"
            trackClassName="horizontal-slider-track"
            min={0}
            max={20}
            step={2}
            value={roundBigBreakNumber}
            onChange={onChangeRoundBigBreakNumber}
          />
        </div>
        <div className="settings-input">
          <button type="button" onClick={onClickDefault}>Reset Defaults</button>
        </div>
      </Scrollbars>
    </div>
  )
}

export default React.memo(Settings);
