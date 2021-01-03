import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';

export interface PaginationProps {
  total?: number;
  defaultCurrent?: number;
  disabled?: boolean;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize?: number) => void;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  onShowSizeChange?: (current: number, size: number) => void;
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  size?: string;
  simple?: boolean;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement<HTMLElement>,
  ) => React.ReactNode;
  role?: string;
  showLessItems?: boolean;
}
interface PaginationState {
  pageSize: number;
  pageTotal: number;
  current: number;
}

export default class Pagination extends React.Component<
  PaginationProps,
  PaginationState
> {
  public constructor(props: PaginationProps) {
    super(props);
  }

  public readonly state: Readonly<PaginationState> = {
    pageSize: 0,
    pageTotal: 0,
    current: 1,
  };

  static defaultProps = {
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 10,
    prefixCls: 'pq-antd-pagination',
    showPrevNextJumpers: true,
    showTitle: true,
    style: {},
    totalBoundaryShowSizeChanger: 50,
  };

  static getDerivedStateFromProps(
    props: PaginationProps,
    state: PaginationState,
  ) {
    const pageSize: number = props.pageSize || props.defaultPageSize || 10;
    const pageTotal: number = props.total
      ? Math.ceil(props.total / pageSize)
      : 0;
    if (
      (pageSize && pageSize !== state.pageSize) ||
      pageTotal !== state.pageTotal
    ) {
      const current: number = props.current || props.defaultCurrent || 1;
      return {
        pageSize,
        pageTotal,
        current,
      };
    }
    return null;
  }

  componentDidMount() {
    // if(!('total' in this.props)){
    //   console.warn("")
    // }
  }

  changeCurrent = (current: number) => {
    this.setState({
      current,
    });
  };

  prev = () => {
    const { current } = this.state;
    this.changeCurrent(Math.max(1, current - 1));
  };

  hasPrev = (): boolean => {
    const { current } = this.state;
    return current > 1;
  };

  renderPrev = (): React.ReactNode => {
    return <Icon type="left" />;
  };

  next = () => {
    const { pageTotal, current } = this.state;
    this.changeCurrent(Math.min(pageTotal, current + 1));
  };

  hasNext = (): boolean => {
    const { current, pageTotal } = this.state;
    return current < pageTotal;
  };

  renderNext = (): React.ReactNode => {
    return <Icon type="right" />;
  };

  showJumpPrev = (): boolean => {
    const { current } = this.state;
    return current - 1 >= 4;
  };

  showJumpNext = (): boolean => {
    const { current, pageTotal } = this.state;
    return pageTotal - current >= 4;
  };

  getShowPageList = (): number[] => {
    const { current, pageTotal } = this.state;
    const pageList: number[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = current - 2; i <= current + 2; i++) {
      if (i <= 0) {
        pageList.push(i + 5);
      } else {
        pageList.push(i);
      }
    }
    pageList.push(...[1, pageTotal]);
    pageList.sort((a, b) => a - b);
    return Array.from(new Set(pageList));
  };

  renderJumpPrev = (): React.ReactNode => {
    const { prefixCls } = this.props;
    return (
      <li title="jumpPrev" className={`${prefixCls}-jump-prev`}>
        ...
      </li>
    );
  };

  renderJumpNext = (): React.ReactNode => {
    const { prefixCls } = this.props;
    return (
      <li title="jumpNext" className={`${prefixCls}-jump-next`}>
        ...
      </li>
    );
  };

  render() {
    const { prefixCls, className, style } = this.props;
    const { pageTotal, current } = this.state;
    const showJump: boolean = pageTotal >= 10;
    const classes = classNames(prefixCls, className);
    const hasPrev = this.hasPrev();
    const hasNext = this.hasNext();
    const pageList: React.ReactNode[] = [];
    if (!showJump) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < pageTotal; i++) {
        const pageNum = i + 1;
        const pageClassName = classNames(
          `${prefixCls}-item`,
          `${prefixCls}-item-${pageNum}`,
          {
            [`${prefixCls}-item-active`]: current === pageNum,
          },
        );
        pageList.push(
          <li
            title={pageNum.toString()}
            className={pageClassName}
            onClick={() => this.changeCurrent(pageNum)}
          >
            {pageNum}
          </li>,
        );
      }
    } else {
      const showJumpPrev = this.showJumpPrev();
      const showJumpNext = this.showJumpNext();
      const showPageList = this.getShowPageList();
      showPageList.forEach(pageNum => {
        const pageClassName = classNames(
          `${prefixCls}-item`,
          `${prefixCls}-item-${pageNum}`,
          {
            [`${prefixCls}-item-active`]: current === pageNum,
          },
        );
        pageList.push(
          <li
            title={pageNum.toString()}
            className={pageClassName}
            onClick={() => this.changeCurrent(pageNum)}
          >
            {pageNum}
          </li>,
        );
      });
      if (showJumpPrev) {
        pageList.splice(1, 0, this.renderJumpPrev());
      }
      if (showJumpNext) {
        pageList.splice(pageList.length - 1, 0, this.renderJumpPrev());
      }
    }

    return (
      <ul className={classes} style={style}>
        <li
          onClick={this.prev}
          className={classNames(`${prefixCls}-prev`, {
            [`${prefixCls}-disabled`]: !hasPrev,
          })}
        >
          {this.renderPrev()}
        </li>
        {pageList}
        <li
          onClick={this.next}
          className={classNames(`${prefixCls}-next`, {
            [`${prefixCls}-disabled`]: !hasNext,
          })}
        >
          {this.renderNext()}
        </li>
      </ul>
    );
  }
}
