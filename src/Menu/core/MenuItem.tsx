import React from 'react';
import classNames from 'classnames';
export interface MenuItemProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  key?: string;
  title?: string;
}
interface MenuItemState {}

export default class MenuItem extends React.Component<
  MenuItemProps,
  MenuItemState
> {
  public readonly state: Readonly<MenuItemState> = {};

  static defaultProps = {
    prefixCls: 'pq-antd-menu-item',
  };

  render() {
    const { prefixCls, className, children } = this.props;
    const classes = classNames(prefixCls, className);
    return <li className={classes}>{children}</li>;
  }
}
