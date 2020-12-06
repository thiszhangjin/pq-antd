import React from 'react';
import classNames from 'classnames';
import PopupMenu from './PopupMenu';
import { MenuMode } from './Menu';

export interface SubMenuProps {
  prefixCls?: string;
  className?: string;
  popupClassName?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  key?: string;
  title?: string | React.ReactNode;
  mode?: MenuMode;
  onTitleClick?: () => void;
}
interface SubMenuState {
  PopupMenuVisible: boolean;
}

export default class SubMenu extends React.Component<
  SubMenuProps,
  SubMenuState
> {
  public readonly state: Readonly<SubMenuState> = {
    PopupMenuVisible: false,
  };

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
  };

  private subMenuRef = React.createRef<HTMLDivElement>();

  onMouseAction = (visible: boolean) => {
    this.setState({
      PopupMenuVisible: visible,
    });
  };

  getChildren = (): React.ReactNode => {
    const { children } = this.props;
    if (children) {
      // @ts-ignore
      return React.Children.map(children, item =>
        React.cloneElement(item, {
          mode: 'vertical',
        }),
      );
    }
    return <div />;
  };

  render() {
    const { prefixCls, className, title, mode, children } = this.props;
    const { PopupMenuVisible } = this.state;
    const classes = classNames(
      prefixCls,
      `${prefixCls}-submenu`,
      {
        [`${prefixCls}-vertical`]: true,
      },
      className,
    );
    return (
      <li
        className={classes}
        ref={this.subMenuRef}
        onMouseEnter={() => this.onMouseAction(true)}
        onMouseLeave={() => this.onMouseAction(false)}
      >
        <div className={`${prefixCls}-submenu-title`}>{title}</div>
        <PopupMenu
          visible={PopupMenuVisible}
          parentNode={this.subMenuRef}
          mode={mode}
        >
          {this.getChildren()}
        </PopupMenu>
      </li>
    );
  }
}
