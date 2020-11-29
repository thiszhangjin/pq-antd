import React from 'react';
import Circle from './Circle';
import Line from './Line';

export interface ProgressProps {
  prefixCls?: string;
  className?: string;
  type?: 'line' | 'circle';
  percent?: number;
  showInfo?: boolean;
  status?: 'success' | 'exception' | 'normal' | 'active';
  strokeLinecap?: 'round' | 'square';
  strokeColor?: string;
  successPercent?: number;
  width?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
  format?: (
    percent: number,
    successPercent: number,
  ) => string | React.ReactNode;
}

interface ProgressState {}

export default class Progress extends React.Component<
  ProgressProps,
  ProgressState
> {
  public readonly state: Readonly<ProgressState> = {};

  public constructor(props: ProgressProps) {
    super(props);
  }

  static defaultProps = {
    prefixCls: 'pq-antd-progress',
    type: 'line',
    strokeLinecap: 'round',
    percent: 0,
    showInfo: true,
    successPercent: 0,
  };

  renderProgress = (): React.ReactNode => {
    const { type } = this.props;
    if (type === 'circle') {
      return <Circle {...this.props} />;
    }
    if (type === 'line') {
      return <Line {...this.props} />;
    }
    return <div />;
  };

  render() {
    return <div>{this.renderProgress()}</div>;
  }
}
