import React from 'react';
import classNames from 'classnames';
import { connect } from 'mini-store';

export interface MenuItemProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  key?: string;
  title?: string;
  style?: React.CSSProperties;
}
interface MenuItemState {}
// @ts-ignore
@connect(state => ({ count: state.count }))
export default class extends React.Component<MenuItemProps, MenuItemState> {
  public readonly state: Readonly<MenuItemState> = {};

  static defaultProps = {
    prefixCls: 'pq-antd-menu-item',
  };

  render() {
    console.log(this.props);
    const { prefixCls, key, className, children, style } = this.props;
    const classes = classNames(prefixCls, className);
    return (
      <li key={key} className={classes} style={style}>
        {children}
      </li>
    );
  }
}
