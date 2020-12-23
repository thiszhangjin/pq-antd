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
  children?: React.ReactNode;
  disabled?: boolean;
  eventKey?: string;
  title?: string | React.ReactNode;
  overflowed?: boolean;
  mode?: MenuMode;
  selectedKeys: string[];
  activeKeys: string[];
  openKeys: string[];
  style?: React.CSSProperties;
  onTitleClick?: () => void;
  updateActiveKeys?: (key: string, active: boolean) => void;
  updateOpenKeys?: (key: string, active: boolean) => void;
}
interface SubMenuState {}

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
    if (this.props.updateOpenKeys && eventKey) {
      this.props.updateOpenKeys(eventKey, !openKeys.includes(eventKey));
    }
  };

  onTitleMouseAction = (mouse: boolean) => {
    const { eventKey } = this.props;
    if (this.props.updateActiveKeys && eventKey) {
      this.props.updateActiveKeys(eventKey, mouse);
    }
  };

  getChildren = (): ReactElement[] => {
    const { children, mode } = this.props;
    if (children) {
      return React.Children.map(children as ReactElement[], item =>
        React.cloneElement(item, {
          mode: mode === 'inline' ? 'inline' : 'vertical',
          eventKey: item.props.eventKey || item.key,
        }),
      );
    }
    return [];
  };

  getArrowIcon = () => {
    const { mode, prefixCls } = this.props;
    const types: {
      [key: string]: string;
    } = {
      horizontal: '',
      vertical: 'right',
      inline: 'down',
    };
    if (mode && types[mode]) {
      return <Icon type={types[mode]} className={`${prefixCls}-arrow`} />;
    }
    return null;
  };

  getChildrenKeys = (
    children: ReactElement[],
    keys: string[] = [],
  ): string[] => {
    React.Children.forEach(children, item => {
      const key: string | undefined = item.props?.eventKey || item.key;
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
    return selectedKeys.some(item => keys.includes(item));
  };

  render() {
    const {
      prefixCls,
      overflowed,
      eventKey,
      activeKeys,
      openKeys,
      className,
      title,
      mode,
      style,
    } = this.props;
    const children = this.getChildren();
    const isOpen = eventKey
      ? openKeys.includes(eventKey) && !overflowed
      : false;
    const isActive = eventKey
      ? activeKeys.includes(eventKey) && !overflowed
      : false;
    const classes = classNames(
      prefixCls,
      `${prefixCls}-submenu`,
      {
        [`${prefixCls}-submenu-open`]: isOpen,
        [`${prefixCls}-submenu-active`]: isActive,
        [`${prefixCls}-submenu-selected`]: this.isChildrenSelected(children),
      },
      className,
    );
    const eventAction: {
      [key: string]: any;
    } = {};
    if (mode === 'vertical' || mode === 'horizontal') {
      eventAction.onMouseEnter = () => this.onSubMenuMouseAction(true);
      eventAction.onMouseLeave = () => this.onSubMenuMouseAction(false);
    } else if (mode === 'inline') {
      eventAction.onClick = (event: React.MouseEvent) =>
        this.onSubMenuClick(event);
    }
    return (
      <li
        className={classes}
        ref={this.subMenuRef}
        style={style}
        {...eventAction}
      >
        <div
          className={`${prefixCls}-submenu-title`}
          onMouseEnter={() => this.onTitleMouseAction(true)}
          onMouseLeave={() => this.onTitleMouseAction(false)}
        >
          {title}
          {this.getArrowIcon()}
        </div>
        {mode === 'inline' ? (
          <ul className="pq-antd-menu pq-antd-menu-inline pq-antd-menu-light">
            {children}
          </ul>
        ) : (
          <PopupMenu visible={isOpen} parentNode={this.subMenuRef} mode={mode}>
            {children}
          </PopupMenu>
        )}
      </li>
    );
  }
}
