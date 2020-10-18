import React from 'react';

export interface AnimateBoxProps {
  visible?: boolean;
  className?: string;
  style: React.CSSProperties;
}
interface AnimateBoxState {}

export default class AnimateBox extends React.Component<
  AnimateBoxProps,
  AnimateBoxState
> {
  public readonly state: Readonly<AnimateBoxState> = {};

  public constructor(props: AnimateBoxProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { ...restProps } = this.props;
    return <div {...restProps} />;
  }
}
