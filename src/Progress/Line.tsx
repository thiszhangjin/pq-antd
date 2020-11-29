import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import { ProgressProps } from './progress';

export interface LineProps extends ProgressProps {}

interface LineState {}

export default class Line extends React.Component<LineProps, LineState> {
  public readonly state: Readonly<LineState> = {};

  public constructor(props: LineProps) {
    super(props);
  }

  renderInfo = (classes: string): React.ReactNode => {
    const { prefixCls, percent = 0, format } = this.props;
    if (format) {
      return format(percent, 0);
    }

    let InfoNode: string | React.ReactNode = `${percent}%`;
    if (classes.includes(`${prefixCls}-success`)) {
      InfoNode = <Icon type="check-circle" theme="filled" />;
    } else if (classes.includes(`${prefixCls}-exception`)) {
      InfoNode = <Icon type="close-circle" theme="filled" />;
    }
    return <div className={`${prefixCls}-line-info`}>{InfoNode}</div>;
  };

  render() {
    const {
      prefixCls,
      strokeWidth = 6,
      strokeColor,
      percent = 0,
      status,
      showInfo,
      className,
      style,
    } = this.props;
    const classes = classNames(
      prefixCls,
      {
        [`${prefixCls}-success`]: percent === 100,
        [`${prefixCls}-${status}`]: status,
      },
      className,
    );
    const bgStyle: React.CSSProperties = {
      width: `${percent}%`,
      background: strokeColor,
    };
    return (
      <div className={classes} style={style}>
        <div className={`${prefixCls}-line`}>
          <div
            className={`${prefixCls}-line-inner`}
            style={{ height: strokeWidth }}
          >
            <div className={`${prefixCls}-line-bg`} style={bgStyle} />
          </div>
          {showInfo && this.renderInfo(classes)}
        </div>
      </div>
    );
  }
}
