import React from 'react';
import './CircleTimer.scss';
import { clockView } from '../../shared/ClockView';
import ProgressRing from '../ProgressRing/ProgressRing';

type CircleTimerProps = {
  time: number,
  percent: number,
  type: string,
  isPlay: boolean,
  onClickPlay: () => void,
  onClickPause: () => void,
}

type TypeValuesType = {
  [name: string]: string
}

const typeValues: TypeValuesType = {
  work: 'Работа',
  small: 'Перерыв',
  big: 'Боль. перерыв'
}

const CircleTimer = (props: CircleTimerProps) => {
  const {
    time,
    percent,
    type,
    isPlay,
    onClickPlay,
    onClickPause,
  } = props;

  const viewTime = clockView(time);

  return (
    <div className="cr-timer">
      <div className="cr-timer__ring">
        <ProgressRing
          radius={100}
          stroke={8}
          progress={percent}
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

export default CircleTimer;
