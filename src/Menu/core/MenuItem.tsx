import React from 'react';
import classNames from 'classnames';

export interface MenuItemProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  key?: string;
  title?: string;
  style?: React.CSSProperties;
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
    const { prefixCls, key, className, children, style } = this.props;
    const classes = classNames(prefixCls, className);
    return (
      <li key={key} className={classes} style={style}>
        {children}
      </li>
    );
  }
}
