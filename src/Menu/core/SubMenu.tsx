import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
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
  style?: React.CSSProperties;
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
    arrowIcon: true,
  };

  private subMenuRef = React.createRef<HTMLLIElement>();

  onMouseAction = (isHover: boolean) => {
    this.setState({
      PopupMenuVisible: isHover,
    });
  };

  getChildren = (): React.ReactNode => {
    const { children } = this.props;
    if (children) {
      // @ts-ignore
      return React.Children.map(children, item =>
        React.cloneElement(item, {
          mode: 'vertical',
          eventKey: item.props.eventKey || item.key,
        }),
      );
    }
    return <div />;
  };

  getArrowIcon = () => {
    const { mode, prefixCls } = this.props;
    if (mode === 'horizontal') {
      return null;
    }
    return <Icon type="right" className={`${prefixCls}-arrow`} />;
  };

  render() {
    const { prefixCls, key, className, title, mode, style } = this.props;
    const { PopupMenuVisible } = this.state;
    const classes = classNames(
      prefixCls,
      `${prefixCls}-submenu`,
      {
        [`${prefixCls}-vertical`]: true,
        [`${prefixCls}-submenu-active`]: PopupMenuVisible,
      },
      className,
    );
    return (
      <li
        className={classes}
        key={key}
        ref={this.subMenuRef}
        onMouseEnter={() => this.onMouseAction(true)}
        onMouseLeave={() => this.onMouseAction(false)}
        style={style}
      >
        <div className={`${prefixCls}-submenu-title`}>{title}</div>
        {this.getArrowIcon()}
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
