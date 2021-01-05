import React from 'react';
import classNames from 'classnames';
import { Icon, Select, Input } from 'antd';

const { Option } = Select;

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
    pageSizeOptions: [10, 20, 50, 100],
    showPrevNextJumpers: true,
    showTitle: true,
    style: {},
    totalBoundaryShowSizeChanger: 50,
  };

  static getDerivedStateFromProps(
    props: PaginationProps,
    state: PaginationState,
  ) {
    const pageSize: number =
      props.pageSize || state.pageSize || props.defaultPageSize || 0;
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
    const { pageTotal } = this.state;
    if (current > pageTotal) {
      current = pageTotal;
    } else if (current <= 0) {
      current = 1;
    }
    this.setState({
      current,
    });
  };

  prev = (count: number = 1) => {
    const { current } = this.state;
    this.changeCurrent(Math.max(1, current - count));
  };

  hasPrev = (): boolean => {
    const { current } = this.state;
    return current > 1;
  };

  renderPrev = (): React.ReactNode => {
    return <Icon type="left" />;
  };

  next = (count: number = 1) => {
    const { pageTotal, current } = this.state;
    this.changeCurrent(Math.min(pageTotal, current + count));
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

  renderJumpPrev = (): React.ReactNode => {
    const { prefixCls } = this.props;
    return (
      <div
        title="jumpPrev"
        className={`${prefixCls}-jump-prev`}
        onClick={this.jumpPrev}
      >
        <button type="button" className={`${prefixCls}-item-link`}>
          <Icon type="double-left" />
          <span className={`${prefixCls}-item-ellipsis`}>•••</span>
        </button>
      </div>
    );
  };

  renderJumpNext = (): React.ReactNode => {
    const { prefixCls } = this.props;
    return (
      <div
        title="jumpNext"
        className={`${prefixCls}-jump-next`}
        onClick={this.jumpNext}
      >
        <button type="button" className={`${prefixCls}-item-link`}>
          <Icon type="double-right" />
          <span className={`${prefixCls}-item-ellipsis`}>•••</span>
        </button>
      </div>
    );
  };

  jumpPrev = () => {
    this.prev(5);
  };

  jumpNext = () => {
    this.next(5);
  };

  getShowPageList = (): number[] => {
    const { current, pageTotal } = this.state;
    const pageList: number[] = [];

    for (let i = current - 2; i <= current + 2; i++) {
      if (i <= 0) {
        pageList.push(i + 5);
      } else if (i > pageTotal) {
        pageList.push(i - 5);
      } else {
        pageList.push(i);
      }
    }
    pageList.push(...[1, pageTotal]);
    pageList.sort((a, b) => a - b);
    return Array.from(new Set(pageList));
  };

  onShowSizeChange = (value: number) => {
    const { onShowSizeChange } = this.props;
    const { current } = this.state;
    this.setState(
      {
        pageSize: value,
      },
      () => {
        if (onShowSizeChange) {
          onShowSizeChange(current, value);
        }
      },
    );
  };

  renderSizeChanger = (): React.ReactNode => {
    const { prefixCls, pageSizeOptions } = this.props;
    const { pageSize } = this.state;
    return (
      <li className={`${prefixCls}-options`}>
        <Select value={pageSize} onChange={this.onShowSizeChange}>
          {pageSizeOptions?.map(item => (
            <Option value={item}>{item}条/页</Option>
          ))}
        </Select>
      </li>
    );
  };

  handleQuickJumper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (typeof value === 'number' && !isNaN(value)) {
      this.changeCurrent(value);
    }
  };

  renderQuickJumper = (): React.ReactNode => {
    const { prefixCls } = this.props;
    return (
      <li className={`${prefixCls}-jumper`}>
        跳至
        <Input onPressEnter={this.handleQuickJumper} />页
      </li>
    );
  };

  render() {
    const {
      prefixCls,
      className,
      showSizeChanger,
      showQuickJumper,
      style,
    } = this.props;
    const { pageTotal, current } = this.state;
    const showJump: boolean = pageTotal >= 10;
    const classes = classNames(prefixCls, className);
    const hasPrev = this.hasPrev();
    const hasNext = this.hasNext();
    const pageList: React.ReactNode[] = [];
    if (!showJump) {
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
        pageList.splice(pageList.length - 1, 0, this.renderJumpNext());
      }
    }

    return (
      <ul className={classes} style={style}>
        <li
          onClick={() => this.prev()}
          className={classNames(`${prefixCls}-prev`, {
            [`${prefixCls}-disabled`]: !hasPrev,
          })}
        >
          {this.renderPrev()}
        </li>
        {pageList}
        <li
          onClick={() => this.next()}
          className={classNames(`${prefixCls}-next`, {
            [`${prefixCls}-disabled`]: !hasNext,
          })}
        >
          {this.renderNext()}
        </li>
        {showSizeChanger && this.renderSizeChanger()}
        {showQuickJumper && this.renderQuickJumper()}
      </ul>
    );
  }
}
