import React from 'react';

export interface MaskProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
interface MaskState {}

export default class Mask extends React.Component<MaskProps, MaskState> {
  public readonly state: Readonly<MaskState> = {};

  public constructor(props: MaskProps) {
    super(props);
  }

  static defaultProps = {
    prefixCls: 'pq-antd-modal',
  };

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  render(): React.ReactNode {
    const { prefixCls, style } = this.props;
    return (
      <div
        style={style}
        className={`${prefixCls}-mask`}
        onClick={this.handleClick}
      />
    );
  }
}
