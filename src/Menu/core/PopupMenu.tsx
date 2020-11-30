import React from 'react';
import ReactDOM from 'react-dom';

export interface PopupMenuProps {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  parentNode?: React.RefObject<HTMLDivElement>;
  children?: [];
}
interface PopupMenuState {}

export default class PopupMenu extends React.Component<
  PopupMenuProps,
  PopupMenuState
> {
  public readonly state: Readonly<PopupMenuState> = {};

  public constructor(props: PopupMenuProps) {
    super(props);
  }

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
    let left = 0;
    let top = 0;

    const { offsetLeft, offsetTop, offsetHeight } = element;

    left = offsetLeft;
    top = offsetTop + offsetHeight;

    return {
      left,
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

    return (
      <div className={`${prefixCls}-sub`} style={targetStyle}>
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
