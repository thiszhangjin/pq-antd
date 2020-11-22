import React from 'react';
import { ProgressProps } from './progress';

export type IStringOrHtmlElement = string | HTMLElement;

export interface CircleProps extends ProgressProps {}

interface CircleState {}

export default class Circle extends React.Component<CircleProps, CircleState> {
  public readonly state: Readonly<CircleState> = {};

  public constructor(props: CircleProps) {
    super(props);
  }

  render() {
    const { width, strokeWidth, percent = 0 } = this.props;
    const cx = width / 2;
    const r = cx - strokeWidth;
    const perimeter = Math.ceil(Math.PI * r * 2);
    const percentPerimeter = (perimeter * percent) / 100;
    return (
      <div style={{ width, height: width }}>
        <svg className="ant-progress-circle" viewBox={`0 0 ${width} ${width}`}>
          <circle
            className="ant-progress-circle-trail"
            cx={cx}
            cy={cx}
            r={r}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className="ant-progress-circle-path"
            cx={cx}
            cy={cx}
            r={r}
            strokeWidth={strokeWidth}
            stroke="#00A5E0"
            fill="none"
            strokeDasharray={`${percentPerimeter} ${perimeter}`}
          />
        </svg>
      </div>
    );
  }
}
