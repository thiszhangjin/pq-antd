import React from 'react';

export interface MaskProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  visible?: boolean;
  maskRef?: React.RefObject<HTMLDivElement>;
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

  render(): React.ReactNode {
    const { prefixCls, style, maskRef, ...restProps } = this.props;
    return (
      <div
        style={style}
        className={`${prefixCls}-mask`}
        ref={maskRef}
        {...restProps}
      />
    );
  }
}
