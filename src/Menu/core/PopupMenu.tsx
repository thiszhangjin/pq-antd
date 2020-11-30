import React from 'react';
import ReactDOM from 'react-dom';
export interface PopupMenuProps {
  prefixCls?: string;
  className?: string;
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

  targetElement: Element = this.createContainer();

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
  };

  createContainer() {
    let containerNode = document.getElementById('triggerContainer');
    //已经存在container
    if (!containerNode) {
      containerNode = document.createElement('div');
      containerNode.id = 'triggerContainer';
      containerNode.style.top = '0';
      containerNode.style.left = '0';
      containerNode.style.width = '100%';
      containerNode.style.position = 'absolute';
    }
    return containerNode;
  }

  render() {
    const { prefixCls, children } = this.props;
    return ReactDOM.createPortal(this.props.children, this.targetElement);
  }
}
