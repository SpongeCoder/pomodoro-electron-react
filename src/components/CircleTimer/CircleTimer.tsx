import React from 'react';
import './CircleTimer.scss';

const CircleTimer = (props: {time: string}) => {
  const {
    time
  } = props;

  return (
    <div className="cr-timer">
      <div className={`c100 p${time} green`}>
        <span>{time}%</span>
        <div className="slice">
          <div className="bar" />
          <div className="fill" />
        </div>
      </div>
    </div>
  );
};

export default CircleTimer;
