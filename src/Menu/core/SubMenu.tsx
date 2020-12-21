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
  key?: string;
  title?: string | React.ReactNode;
  mode?: MenuMode;
  selectedKeys: string[];
  style?: React.CSSProperties;
  onTitleClick?: () => void;
}
interface SubMenuState {
  PopupMenuVisible: boolean;
}

@connect(state => ({
  selectedKeys: state.selectedKeys,
}))
export default class extends React.Component<SubMenuProps, SubMenuState> {
  public readonly state: Readonly<SubMenuState> = {
    PopupMenuVisible: false,
  };

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
    arrowIcon: true,
  };

  private subMenuRef = React.createRef<HTMLLIElement>();

  onMouseAction = (event: React.MouseEvent, isHover: boolean) => {
    this.setState({
      PopupMenuVisible: isHover,
    });
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
    if (mode === 'inline') {
      return <Icon type="down" className={`${prefixCls}-arrow`} />;
    }
    if (mode === 'vertical') {
      return <Icon type="right" className={`${prefixCls}-arrow`} />;
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
    const { prefixCls, key, className, title, mode, style } = this.props;
    const { PopupMenuVisible } = this.state;
    const children = this.getChildren();
    const classes = classNames(
      prefixCls,
      `${prefixCls}-submenu`,
      {
        // [`${prefixCls}-submenu-vertical`]: true,
        [`${prefixCls}-submenu-active`]: PopupMenuVisible,
        [`${prefixCls}-submenu-selected`]: this.isChildrenSelected(children),
      },
      className,
    );
    return (
      <li
        className={classes}
        key={key}
        ref={this.subMenuRef}
        onMouseEnter={event => this.onMouseAction(event, true)}
        onMouseLeave={event => this.onMouseAction(event, false)}
        style={style}
      >
        <div className={`${prefixCls}-submenu-title`}>
          {title}
          {this.getArrowIcon()}
        </div>
        {mode === 'inline' ? (
          <ul className="pq-antd-menu pq-antd-menu-inline pq-antd-menu-light">
            {children}
          </ul>
        ) : (
          <PopupMenu
            visible={PopupMenuVisible}
            parentNode={this.subMenuRef}
            mode={mode}
          >
            {children}
          </PopupMenu>
        )}
      </li>
    );
  }
}
