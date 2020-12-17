import React from 'react';
import classNames from 'classnames';
import { connect } from 'mini-store';

export interface MenuItemProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  eventKey?: string;
  title?: string;
  selectedKeys: string[];
  style?: React.CSSProperties;
  onClick?: (key: string) => void;
}
interface MenuItemState {
  isHover: boolean;
}
// @ts-ignore
@connect(state => ({
  selectedKeys: state.selectedKeys,
  onClick: state.onClick,
}))
export default class extends React.Component<MenuItemProps, MenuItemState> {
  public readonly state: Readonly<MenuItemState> = {
    isHover: false,
  };

  static defaultProps = {
    prefixCls: 'pq-antd-menu-item',
  };

  onMouseAction = (isHover: boolean) => {
    this.setState({
      isHover,
    });
  };

  onClick = () => {
    const { eventKey } = this.props;
    if (this.props.onClick && eventKey) {
      this.props.onClick(eventKey);
    }
  };

  render() {
    const {
      prefixCls,
      className,
      children,
      selectedKeys,
      eventKey,
      style,
    } = this.props;
    const { isHover } = this.state;
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-active`]: isHover,
      [`${prefixCls}-selected`]: eventKey && selectedKeys.includes(eventKey),
    });
    return (
      <li
        className={classes}
        style={style}
        onMouseEnter={() => this.onMouseAction(true)}
        onMouseLeave={() => this.onMouseAction(false)}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}
