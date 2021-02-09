import React from 'react';
import './ProgressRing.scss';

type ProgressRingProps = {
  radius: number,
  stroke: number,
  progress: number,
}

/* export default class ProgressRing extends React.Component<ProgressRingProps> {
  private normalizedRadius: number;

  private circumference: number;

  constructor(props: ProgressRingProps) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { radius, stroke, progress } = this.props;

    const strokeDashoffset = this.circumference - progress / 100 * this.circumference;

    return (
      <svg
        height={radius * 2}
        width={radius * 2}
        className="progress-ring"
       >
        <circle
          fill="transparent"
          strokeWidth={ stroke }
          strokeDasharray={ `${this.circumference} ${this.circumference}` }
          style={ { strokeDashoffset } }
          r={ this.normalizedRadius }
          cx={ radius }
          cy={ radius }
         />
      </svg>
    );
  }
} */


const ProgressRing = (props: ProgressRingProps) => {
  const {
    radius, stroke, progress
  } = props;

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
