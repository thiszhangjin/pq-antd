import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import { ProgressProps } from './progress';

export type IStringOrHtmlElement = string | HTMLElement;

export interface CircleProps extends ProgressProps {}

interface CircleState {}

export default class Circle extends React.Component<CircleProps, CircleState> {
  public readonly state: Readonly<CircleState> = {};

  public constructor(props: CircleProps) {
    super(props);
  }

  renderInfo = (classes: string): React.ReactNode => {
    const { prefixCls, percent = 0, format } = this.props;
    if (format) {
      return format(percent, 0);
    }

    let InfoNode: string | React.ReactNode = `${percent}%`;
    if (classes.includes(`${prefixCls}-success`)) {
      InfoNode = <Icon type="check" />;
    } else if (classes.includes(`${prefixCls}-exception`)) {
      InfoNode = <Icon type="close" />;
    }
    return <div className={`${prefixCls}-circle-info`}>{InfoNode}</div>;
  };

  render() {
    const {
      prefixCls,
      width,
      strokeWidth,
      strokeColor,
      percent = 0,
      status,
      showInfo,
      className,
    } = this.props;
    const cx = width / 2;
    const r = cx - strokeWidth;
    const perimeter = Math.ceil(Math.PI * r * 2);
    const percentPerimeter = (perimeter * percent) / 100;
    const classes = classNames(
      prefixCls,
      {
        [`${prefixCls}-success`]: percent === 100,
        [`${prefixCls}-${status}`]: status,
      },
      className,
    );

    return (
      <div className={classes} style={{ width, height: width }}>
        <svg
          className={`${prefixCls}-circle`}
          viewBox={`0 0 ${width} ${width}`}
        >
          <circle
            className={`${prefixCls}-circle-trail`}
            cx={cx}
            cy={cx}
            r={r}
            strokeWidth={strokeWidth}
            stroke="#f3f3f3"
            fill="none"
          />
          <circle
            className={`${prefixCls}-circle-path`}
            cx={cx}
            cy={cx}
            r={r}
            strokeWidth={strokeWidth}
            style={{ stroke: strokeColor }}
            fill="none"
            strokeDasharray={`${percentPerimeter} ${perimeter}`}
          />
        </svg>
        {showInfo && this.renderInfo(classes)}
      </div>
    );
  }
}
