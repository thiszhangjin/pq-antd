import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { MenuMode } from './Menu';
import SubMenu from './SubMenu';

export interface DomWrapProps {
  prefixCls?: string;
  className?: string;
  children?: React.ReactElement[];
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
    const { mode } = this.props;
    if (mode === 'horizontal') {
      const menuElement: Element = this.menuRef.current!;
      const { children } = menuElement;
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(() => {
          this.onResize();
        });
      });

      ([...children, menuElement] as HTMLElement[]).forEach(
        (el: HTMLElement) => {
          this.resizeObserver!.observe(el);
        },
      );
    }
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
        (item as HTMLElement).style.display = 'inline-block';
      }

      const { width } = item.getBoundingClientRect();
      totalChildrenWidth += width;

      if (isOverflowed) {
        (item as HTMLElement).style.display = 'none';
      }

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
    overflowedItems: React.ReactElement[],
  ): React.ReactNode => {
    const style: React.CSSProperties = {
      display: 'none',
    };

    if (overflowedItems.length > 0) {
      style.display = 'inline-block';
    }

    return (
      <SubMenu
        title="..."
        style={style}
        key="SubMenu-overflowed"
        eventKey="SubMenu-overflowed"
        mode="horizontal"
      >
        {overflowedItems}
      </SubMenu>
    );
  };

  getChildren = () => {
    const { children, prefixCls, mode } = this.props;
    const { lastVisibleIndex } = this.state;
    const overflowedItems: React.ReactElement[] = [];
    const overflowedStyle: React.CSSProperties = {
      display: 'none',
    };
    const originChildren: React.ReactElement[] = React.Children.map(
      children as React.ReactElement[],
      (item: React.ReactElement, index) => {
        const baseProps = {
          mode,
          eventKey: item!.key,
        };
        if (index > lastVisibleIndex && lastVisibleIndex > -1) {
          overflowedItems.push(item);
          return React.cloneElement(item as React.ReactElement, {
            className: `${prefixCls}-item-overflowed`,
            overflowed: true,
            style: overflowedStyle,
            ...baseProps,
          });
        }
        return React.cloneElement(item as React.ReactElement, { ...baseProps });
      },
    ) as React.ReactElement[];

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
