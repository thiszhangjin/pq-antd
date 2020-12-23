import React from 'react';
import classNames from 'classnames';
import { Provider, create } from 'mini-store';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import DomWrap from './DomWrap';

export type MenuTheme = 'light' | 'dark';

export type MenuMode = 'vertical' | 'horizontal' | 'inline';
export interface SelectParam {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: Event;
  selectedKeys: Array<string>;
}
export interface ClickParam {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: Event;
}
export interface MenuProps {
  id?: string;
  // theme?: MenuTheme;
  mode?: MenuMode;
  // selectable?: boolean;
  selectedKeys?: Array<string>;
  defaultSelectedKeys?: Array<string>;
  openKeys?: Array<string>;
  defaultOpenKeys?: Array<string>;
  onOpenChange?: (openKeys: string[]) => void;
  onSelect?: (param: SelectParam) => void;
  // onDeselect?: (param: SelectParam) => void;
  onClick?: (param: ClickParam) => void;
  style?: React.CSSProperties;
  // openAnimation?: string;
  // openTransitionName?: string;
  motion?: Object;
  className?: string;
  prefixCls?: string;
  // multiple?: boolean;
  // inlineIndent?: number;
  // inlineCollapsed?: boolean;
  // subMenuCloseDelay?: number;
  // subMenuOpenDelay?: number;
  children?: React.ReactElement[];
  // onMouseEnter?: (e: MouseEvent) => void;
  // getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  // overflowedIndicator?: React.ReactNode;
  // forceSubMenuRender?: boolean;
}
interface MenuState {}

export default class Menu extends React.Component<MenuProps, MenuState> {
  static Item = MenuItem;

  static SubMenu = SubMenu;

  public constructor(props: MenuProps) {
    super(props);
    const selectedKeys = this.props.selectedKeys || [];
    const openKeys = this.props.openKeys || [];
    this.store = create({
      selectedKeys,
      openKeys,
      activeKeys: [],
      onClick: null,
      updateActiveKeys: null,
      updateOpenKeys: null,
    });
  }

  public readonly state: Readonly<MenuState> = {};

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
    mode: 'vertical',
    theme: 'light',
  };

  public store = create({});

  componentDidMount() {
    this.store.setState({
      onClick: this.onClick,
      updateActiveKeys: this.updateActiveKeys,
      updateOpenKeys: this.updateOpenKeys,
    });
  }

  onClick = (key: string) => {
    /**
     * to-do onSelect
     */
    this.store.setState({
      selectedKeys: [key],
    });
  };

  updateActiveKeys = (key: string, active: boolean) => {
    this.store.setState({
      activeKeys: active ? [key] : [],
    });
  };

  updateOpenKeys = (key: string, open: boolean) => {
    const { onOpenChange } = this.props;
    const { openKeys } = this.store.getState();
    let newOpenKeys = [];
    if (open) {
      newOpenKeys = [...openKeys, key];
    } else {
      newOpenKeys = openKeys.filter((item: string) => item !== key);
    }
    this.store.setState({
      openKeys: newOpenKeys,
    });
    if (onOpenChange) {
      onOpenChange(newOpenKeys);
    }
  };

  render() {
    const { prefixCls, mode, theme, className, children, style } = this.props;
    const classes = classNames(
      prefixCls,
      {
        [`${prefixCls}-${mode}`]: mode,
        [`${prefixCls}-${theme}`]: theme,
      },
      className,
    );
    return (
      <Provider store={this.store}>
        <DomWrap className={classes} mode={mode} style={style}>
          {children}
        </DomWrap>
      </Provider>
    );
  }
}
