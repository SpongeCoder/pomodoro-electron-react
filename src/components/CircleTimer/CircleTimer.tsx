import React from 'react';
import './CircleTimer.scss';
import { clockView } from '../../shared/ClockView';

const CircleTimer = (props: {time: number, percent: number, type: string}) => {
  const {
    time,
    percent,
    type
  } = props;

  const viewTime = clockView(time);

  return (
    <div className="cr-timer">
      <div className={`c100 p${percent} green`}>
        <span>{viewTime}</span>
        <div className="cr-timer__type">{type}</div>
        <div className="slice">
          <div className="bar" />
          <div className="fill" />
        </div>
      </div>
    </div>
  );
};

export default CircleTimer;
