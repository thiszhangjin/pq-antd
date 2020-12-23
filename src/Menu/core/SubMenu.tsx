import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import { connect } from 'mini-store';
import PopupMenu from './PopupMenu';
import { MenuMode } from './Menu';

export interface SubMenuProps {
  prefixCls?: string;
  className?: string;
  popupClassName?: string;
  children?: React.ReactElement[];
  disabled?: boolean;
  eventKey?: string;
  title?: string | React.ReactNode;
  overflowed?: boolean;
  mode?: MenuMode;
  selectedKeys?: string[];
  activeKeys?: string[];
  openKeys?: string[];
  style?: React.CSSProperties;
  onTitleClick?: () => void;
  updateActiveKeys?: (key: string, active: boolean) => void;
  updateOpenKeys?: (key: string, active: boolean) => void;
}
interface SubMenuState {}

enum ArrowIconTypes {
  'horizontal' = '',
  'vertical' = 'right',
  'inline' = 'down',
}

@connect(state => ({
  selectedKeys: state.selectedKeys,
  activeKeys: state.activeKeys,
  openKeys: state.openKeys,
  onClick: state.onClick,
  updateActiveKeys: state.updateActiveKeys,
  updateOpenKeys: state.updateOpenKeys,
}))
export default class extends React.Component<SubMenuProps, SubMenuState> {
  public readonly state: Readonly<SubMenuState> = {};

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
    arrowIcon: true,
  };

  private subMenuRef = React.createRef<HTMLLIElement>();

  onSubMenuMouseAction = (mouse: boolean) => {
    const { eventKey } = this.props;
    if (this.props.updateOpenKeys && eventKey) {
      this.props.updateOpenKeys(eventKey, mouse);
    }
  };

  onSubMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const { eventKey, openKeys } = this.props;
    if (this.props.updateOpenKeys && eventKey && openKeys) {
      this.props.updateOpenKeys(eventKey, !openKeys.includes(eventKey));
    }
  };

  onTitleMouseAction = (mouse: boolean) => {
    const { eventKey } = this.props;
    if (this.props.updateActiveKeys && eventKey) {
      this.props.updateActiveKeys(eventKey, mouse);
    }
  };

  getSubMenuEvents = (): {} => {
    const { mode, disabled } = this.props;
    if (disabled) {
      return {};
    }
    if (mode === 'vertical' || mode === 'horizontal') {
      return {
        onMouseEnter: () => this.onSubMenuMouseAction(true),
        onMouseLeave: () => this.onSubMenuMouseAction(false),
      };
    }
    return {
      onClick: (event: React.MouseEvent) => this.onSubMenuClick(event),
    };
  };

  getSubMenuTitleEvents = () => {
    const { disabled } = this.props;
    if (disabled) {
      return {};
    }
    return {
      onMouseEnter: () => this.onTitleMouseAction(true),
      onMouseLeave: () => this.onTitleMouseAction(false),
    };
  };

  getEventKey = (element: React.ReactElement): string => {
    const { props, key } = element;
    if (props || key) {
      return props.eventKey || key;
    }
    return '';
  };

  getChildren = (): ReactElement[] => {
    const { children, mode, overflowed } = this.props;
    if (children) {
      return React.Children.map(children, item =>
        React.cloneElement(item, {
          mode: mode === 'inline' ? 'inline' : 'vertical',
          eventKey: this.getEventKey(item),
          overflowed,
        }),
      );
    }
    return [];
  };

  getArrowIcon = () => {
    const { mode, prefixCls } = this.props;
    if (mode && ArrowIconTypes[mode]) {
      return (
        <Icon type={ArrowIconTypes[mode]} className={`${prefixCls}-arrow`} />
      );
    }
    return null;
  };

  getChildrenKeys = (
    children: ReactElement[],
    keys: string[] = [],
  ): string[] => {
    React.Children.forEach(children, item => {
      const key: string = this.getEventKey(item);
      if (key) {
        keys.push(key);
      }
      if (item.props && item.props.children) {
        this.getChildrenKeys(item.props.children, keys);
      }
    });
    return Array.from(new Set(keys));
  };

  isChildrenSelected = (children: ReactElement[]): boolean => {
    const { selectedKeys } = this.props;
    const keys = this.getChildrenKeys(children);
    if (selectedKeys) {
      return selectedKeys.some(item => keys.includes(item));
    }
    return false;
  };

  isOpen = (): boolean => {
    const { openKeys, eventKey, overflowed } = this.props;
    if (openKeys && eventKey) {
      return openKeys.includes(eventKey) && !overflowed;
    }
    return false;
  };

  isActive = (): boolean => {
    const { activeKeys, eventKey, overflowed } = this.props;
    if (activeKeys && eventKey) {
      return activeKeys.includes(eventKey) && !overflowed;
    }
    return false;
  };

  render() {
    const { prefixCls, className, title, mode, disabled, style } = this.props;

    const children = this.getChildren();
    const subMenuEvents = this.getSubMenuEvents();
    const subMenuTitleEvents = this.getSubMenuTitleEvents();
    const isOpen = this.isOpen();
    const isActive = this.isActive();
    const classes = classNames(className, `${prefixCls}-submenu`, {
      [`${prefixCls}-submenu-open`]: isOpen,
      [`${prefixCls}-submenu-active`]: isActive,
      [`${prefixCls}-submenu-selected`]: this.isChildrenSelected(children),
      [`${prefixCls}-submenu-disabled`]: disabled,
    });

    let renderChildren = null;
    if (mode === 'inline') {
      renderChildren = (
        <ul className="pq-antd-menu pq-antd-menu-inline pq-antd-menu-light">
          {children}
        </ul>
      );
    } else {
      renderChildren = (
        <PopupMenu visible={isOpen} parentNode={this.subMenuRef} mode={mode}>
          {children}
        </PopupMenu>
      );
    }

    return (
      <li
        className={classes}
        ref={this.subMenuRef}
        style={style}
        {...subMenuEvents}
      >
        <div className={`${prefixCls}-submenu-title`} {...subMenuTitleEvents}>
          {title}
          {this.getArrowIcon()}
        </div>
        {renderChildren}
      </li>
    );
  }
}
