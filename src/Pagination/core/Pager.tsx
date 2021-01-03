import React from 'react';

export interface PagerProps {
  className: string;
}
interface PagerState {}

export default class Pager extends React.Component<PagerProps, PagerState> {
  public constructor(props: PagerProps) {
    super(props);
  }

  public readonly state: Readonly<PagerState> = {};

  static defaultProps = {};

  render() {
    const { className, children } = this.props;
    return <div className={className}>{children}</div>;
  }
}
