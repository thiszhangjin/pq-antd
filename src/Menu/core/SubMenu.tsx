import React from 'react';
import classNames from 'classnames';
import Menu from './Menu';
import PopupMenu from './PopupMenu';
export interface SubMenuProps {
  prefixCls?: string;
  className?: string;
  popupClassName?: string;
  children?: [];
  disabled?: boolean;
  key?: string;
  title?: string | React.ReactNode;
  onTitleClick?: () => void;
}
interface SubMenuState {}

export default class SubMenu extends React.Component<
  SubMenuProps,
  SubMenuState
> {
  public readonly state: Readonly<SubMenuState> = {};

  public constructor(props: SubMenuProps) {
    super(props);
  }

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
  };

  render() {
    const { prefixCls, className, title, children } = this.props;
    const classes = classNames(`${prefixCls}-submenu`, className);
    return (
      <li className={classes}>
        <div className={`${prefixCls}-submenu-title`}>{title}</div>
        <PopupMenu>{children}</PopupMenu>
      </li>
    );
  }
}
