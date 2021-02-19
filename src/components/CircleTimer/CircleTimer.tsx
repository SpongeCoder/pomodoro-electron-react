import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CircleTimer.scss';
import { clockView } from '../../shared/ClockView';
import ProgressRing from '../ProgressRing/ProgressRing';
import { MainState } from '../../reducers/main/main';
import { SettingsState } from '../../reducers/settings/settings';
import { onSetIsPlay } from '../../reducers/main/actions';

type CircleTimerProps = {
  time: number,
}

type TypeValuesType = {
  [name: string]: string
}

const typeValues: TypeValuesType = {
  work: 'Работа',
  small: 'Перерыв',
  big: 'Большой перерыв'
}

const colorValues: TypeValuesType = {
  work: '#f783ac',
  small: '#a9e34b',
  big: '#ffd43b'
}

const CircleTimer = ({time}: CircleTimerProps) => {
  const type = useSelector((state: { main: MainState }) => state.main.typeTime);
  const isPlay = useSelector((state: { main: MainState }) => state.main.isPlay);
  const settingsTime = useSelector((state: { settings: SettingsState }) => state.settings.time);
  const dispatch = useDispatch();

  const onClickPause = () => {
    dispatch(onSetIsPlay(false));
  }

  const onClickPlay = () => {
    dispatch(onSetIsPlay(true));
  }

  const viewTime = clockView(time);
  const percent = 100 - (time / settingsTime[type] * 100);

  console.log('render time')
  return (
    <div className="cr-timer">
      <div className="cr-timer__ring">
        <ProgressRing
          radius={100}
          stroke={8}
          progress={percent}
          strokeColor={colorValues[type]}
        />
        <div className="cr-timer__info">
          <div className="cr-timer__time">{viewTime}</div>
          <div className="cr-timer__type">{typeValues[type]}</div>
        </div>
        <div className="cr-timer__bg-circle" />
      </div>

      <div className="cr-timer__btn-play">
        {
          !isPlay &&
          <button type="button" onClick={onClickPlay}>
            <i className="las la-play" />
          </button>
        }
        {
          isPlay &&
          <button type="button" onClick={onClickPause}>
            <i className="las la-pause" />
          </button>
        }
      </div>
    </div>
  );
};

export default React.memo(CircleTimer);
