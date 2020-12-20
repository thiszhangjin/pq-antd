import React, { ReactElement } from 'react';
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
  theme?: MenuTheme;
  mode?: MenuMode;
  selectable?: boolean;
  selectedKeys?: Array<string>;
  defaultSelectedKeys?: Array<string>;
  openKeys?: Array<string>;
  defaultOpenKeys?: Array<string>;
  onOpenChange?: (openKeys: string[]) => void;
  onSelect?: (param: SelectParam) => void;
  onDeselect?: (param: SelectParam) => void;
  onClick?: (param: ClickParam) => void;
  style?: React.CSSProperties;
  openAnimation?: string;
  openTransitionName?: string;
  motion?: Object;
  className?: string;
  prefixCls?: string;
  multiple?: boolean;
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  subMenuCloseDelay?: number;
  subMenuOpenDelay?: number;
  focusable?: boolean;
  onMouseEnter?: (e: MouseEvent) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  overflowedIndicator?: React.ReactNode;
  forceSubMenuRender?: boolean;
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
      onClick: null,
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
    });
  }

  onClick = (key: string) => {
    this.store.setState({
      selectedKeys: [key],
    });
  };

  getChildren = (): React.ReactNode => {
    const { children, mode } = this.props;
    if (children) {
      return React.Children.map(
        children as ReactElement[],
        (item: ReactElement) =>
          React.cloneElement(item, {
            mode,
            eventKey: item.key,
          }),
      );
    }
    return <div />;
  };

  render() {
    const { prefixCls, mode, theme, className, style } = this.props;
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
          {this.getChildren()}
        </DomWrap>
      </Provider>
    );
  }
}
