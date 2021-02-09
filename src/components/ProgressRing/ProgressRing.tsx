import React from 'react';
import './ProgressRing.scss';

type ProgressRingProps = {
  radius: number,
  stroke: number,
  progress: number,
  strokeColor: string
}

const ProgressRing = (props: ProgressRingProps) => {
  const { radius, stroke, progress, strokeColor } = props;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="progress-ring"
      >
      <circle
        fill="transparent"
        strokeWidth={ stroke }
        stroke={ strokeColor }
        strokeDasharray={ `${circumference} ${circumference}` }
        style={ { strokeDashoffset } }
        r={ normalizedRadius }
        cx={ radius }
        cy={ radius }
        />
    </svg>
  );
}

export default ProgressRing;
