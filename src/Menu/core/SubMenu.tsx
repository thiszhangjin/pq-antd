import React from 'react';
import classNames from 'classnames';
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

  public constructor(props: SubMenuProps) {
    super(props);
  }

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
  };

  private subMenuRef = React.createRef<HTMLDivElement>();

  onMouseAction = (visible: boolean) => {
    this.setState({
      PopupMenuVisible: visible,
    });
  };

  render() {
    const { prefixCls, className, title, children } = this.props;
    const { PopupMenuVisible } = this.state;
    const classes = classNames(`${prefixCls}-submenu`, className);
    return (
      <li
        className={classes}
        ref={this.subMenuRef}
        onMouseEnter={() => this.onMouseAction(true)}
        onMouseLeave={() => this.onMouseAction(false)}
      >
        <div className={`${prefixCls}-submenu-title`}>{title}</div>
        <PopupMenu visible={PopupMenuVisible} parentNode={this.subMenuRef}>
          {children}
        </PopupMenu>
      </li>
    );
  }
}
