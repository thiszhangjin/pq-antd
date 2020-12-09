import React from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';
import { MenuMode } from './Menu';

export interface DomWrapProps {
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  mode?: MenuMode;
  style?: React.CSSProperties;
}
interface DomWrapState {}

export default class DomWrap extends React.Component<
  DomWrapProps,
  DomWrapState
> {
  public readonly state: Readonly<DomWrapState> = {};

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
      entries.forEach(entry => {
        // const {left, top, width, height} = entry.contentRect;
        // console.log(left, top, width, height)
        this.onResize();
      });
    });

    ([...children, menuElement] as HTMLElement[]).forEach((el: HTMLElement) => {
      this.resizeObserver!.observe(el);
    });
  };

  onResize = () => {
    const menuElement: Element = this.menuRef.current!;
    const { children } = menuElement;

    const menuElementWidth = menuElement.getBoundingClientRect().width;

    let totalChildrenWidth = 0;
    [...children].forEach(item => {
      const { width } = item.getBoundingClientRect();
      totalChildrenWidth += width;
    });

    console.log(menuElementWidth, totalChildrenWidth);
  };

  render() {
    const { className, style, children } = this.props;
    return (
      <ul className={className} style={style} ref={this.menuRef}>
        {children}
      </ul>
    );
  }
}
