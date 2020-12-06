import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { MenuMode } from './Menu';

export interface PopupMenuProps {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  parentNode?: React.RefObject<HTMLDivElement>;
  mode?: MenuMode;
  children?: React.ReactNode;
}
interface PopupMenuState {}

export default class PopupMenu extends React.Component<
  PopupMenuProps,
  PopupMenuState
> {
  public readonly state: Readonly<PopupMenuState> = {};

  targetElement: Element | null = null;

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
    visible: false,
  };

  componentDidMount() {}

  createContainer = (): Element => {
    let containerNode = document.getElementById('triggerContainer');
    if (!containerNode) {
      containerNode = document.createElement('div');
      containerNode.id = 'triggerContainer';
      document.body.appendChild(containerNode);
    }
    return containerNode;
  };

  getLocation = (element: HTMLDivElement): { top: number; left: number } => {
    const { mode } = this.props;
    const { top, left, width, height } = element.getBoundingClientRect();
    if (mode === 'horizontal') {
      return {
        left,
        top: top + height,
      };
    }

    return {
      left: left + width,
      top,
    };
  };

  renderMenu = () => {
    const { prefixCls, children, visible, parentNode } = this.props;

    const targetStyle: React.CSSProperties = {
      display: visible ? 'block' : 'none',
    };

    const element: HTMLDivElement | null | undefined = parentNode?.current;
    if (element) {
      const { top, left } = this.getLocation(element);
      targetStyle.top = top;
      targetStyle.left = left;
      targetStyle.width = element.offsetWidth;
    }
    const classes = classNames(prefixCls, `${prefixCls}-sub`, {
      [`${prefixCls}-vertical`]: true,
    });
    return (
      <div className={classes} style={targetStyle}>
        {children}
      </div>
    );
  };

  render() {
    const { prefixCls, children } = this.props;
    if (!this.targetElement) {
      this.targetElement = this.createContainer();
    }
    return ReactDOM.createPortal(this.renderMenu(), this.targetElement);
  }
}
