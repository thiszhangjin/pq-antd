import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { MenuMode } from './Menu';
import SubMenu from './SubMenu';

export interface DomWrapProps {
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  mode?: MenuMode;
  style?: React.CSSProperties;
}
interface DomWrapState {
  lastVisibleIndex: number;
}

export default class DomWrap extends React.Component<
  DomWrapProps,
  DomWrapState
> {
  public readonly state: Readonly<DomWrapState> = {
    lastVisibleIndex: -1,
  };

  public menuRef = React.createRef<HTMLUListElement>();

  public resizeObserver: ResizeObserver | null = null;

  static defaultProps = {
    prefixCls: 'pq-antd-menu',
  };

  componentDidMount() {
    this.observerChildren();
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  observerChildren = () => {
    const menuElement: Element = this.menuRef.current!;
    const { children } = menuElement;
    this.resizeObserver = new ResizeObserver(entries => {
      entries.forEach(() => {
        this.onResize();
      });
    });

    ([...children, menuElement] as HTMLElement[]).forEach((el: HTMLElement) => {
      this.resizeObserver!.observe(el);
    });
  };

  onResize = () => {
    const menuElement: HTMLUListElement = this.menuRef.current!;
    const { children } = menuElement;

    const menuElementWidth = menuElement.getBoundingClientRect().width;

    let totalChildrenWidth = 0;

    let lastVisibleIndex = -1;

    [...children].some((item, index) => {
      const isOverflowed = item.className.includes('overflowed');
      if (isOverflowed) {
        item.style.display = 'inline-block';
      }

      const { width } = item.getBoundingClientRect();

      if (isOverflowed) {
        item.style.display = 'none';
      }
      totalChildrenWidth += width;

      if (totalChildrenWidth > menuElementWidth) {
        lastVisibleIndex = index - 1;
        return true;
      }

      return false;
    });

    this.setState({
      lastVisibleIndex,
    });
  };

  getOverflowedSubMenuItem = (
    overflowedItems: React.ReactNode[],
  ): React.ReactNode => {
    let style: React.CSSProperties = {};

    if (overflowedItems.length > 0) {
      style = {
        visibility: 'visible',
      };
    } else {
      style = {
        display: 'none',
      };
    }

    return (
      <SubMenu title="..." style={style} key="overflowed" mode="horizontal">
        {overflowedItems}
      </SubMenu>
    );
  };

  getChildren = () => {
    const { children, prefixCls } = this.props;
    const { lastVisibleIndex } = this.state;
    const overflowedItems: React.ReactNode[] = [];
    const overflowedStyle: React.CSSProperties = {
      display: 'none',
    };
    const originChildren: React.ReactNode[] = React.Children.map(
      children,
      (item, index) => {
        if (index > lastVisibleIndex && lastVisibleIndex > -1) {
          overflowedItems.push(item);
          return React.cloneElement(item as React.ReactElement, {
            className: `${prefixCls}-item-overflowed`,
            style: overflowedStyle,
          });
        }
        return React.cloneElement(item as React.ReactElement, {});
      },
    ) as React.ReactNode[];

    const overflowedSubMenu = this.getOverflowedSubMenuItem(overflowedItems);

    return [...originChildren, overflowedSubMenu];
  };

  render() {
    const { className, style } = this.props;
    return (
      <ul className={className} style={style} ref={this.menuRef}>
        {this.getChildren()}
      </ul>
    );
  }
}
