import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CircleTimer.scss';
import { clockView } from '../../shared/ClockView';
import ProgressRing from '../ProgressRing/ProgressRing';
import { MainState } from '../../reducers/main/main';

type CircleTimerProps = {
  time: number,
  percent: number,
  onClickPlay: () => void,
  onClickPause: () => void,
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

const CircleTimer = (props: CircleTimerProps) => {
  const type = useSelector((state: { main: MainState }) => state.main.typeTime);
  const isPlay = useSelector((state: { main: MainState }) => state.main.isPlay);
  const dispatch = useDispatch();

  const {
    time,
    percent,
    onClickPlay,
    onClickPause,
  } = props;

  const viewTime = clockView(time);
  console.log('render circle timer');
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
