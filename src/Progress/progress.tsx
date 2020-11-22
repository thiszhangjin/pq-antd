import React from 'react';
import Circle from './Circle';

export type IStringOrHtmlElement = string | Element;

export interface ProgressProps {
  type?: 'line' | 'circle';
  percent?: number;
  showInfo?: boolean;
  status?: string;
  strokeLinecap?: 'round' | 'square';
  strokeColor?: string;
  successPercent?: number;
  width: number;
  strokeWidth: number;
  format?: (percent: number, successPercent: number) => IStringOrHtmlElement;
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
    type: 'line',
    strokeLinecap: 'round',
    percent: 0,
    showInfo: true,
    successPercent: 0,
    width: 132,
    strokeWidth: 6,
  };

  renderProgress = (): React.ReactNode => {
    const { type } = this.props;
    if (type === 'circle') {
      return <Circle {...this.props} />;
    }
    return <div />;
  };

  render() {
    return <div>{this.renderProgress()}</div>;
  }
}
