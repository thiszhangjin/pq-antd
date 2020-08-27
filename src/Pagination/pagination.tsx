import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';

interface IProps {
  current?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  pageSize?: number;
  pageSizeOptions?: number | number[];
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  simple?: boolean;
  total?: number;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onChange?: (page: number, pageSize: number) => void;
}
interface IState {
  prefixCls: string;
  current: number;
}

export default class Pagination extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    prefixCls: 'myantd',
    current: this.props.current || 1,
  };

  public constructor(props: IProps) {
    super(props);
  }

  hanldeChange = (current: number): void => {
    this.setState({
      current,
    });
  };

  jumpPrev = () => {
    const { current } = this.state;
    this.hanldeChange(Math.max(1, current - 1));
  };

  jumpNext = () => {
    const { current } = this.state;
    const { pageSize = 10, total = 0 } = this.props;
    const length = Math.ceil(total / pageSize);
    this.hanldeChange(Math.min(length, current + 1));
  };

  renderPaginationPrev: () => React.ReactNode = () => {
    return (
      <li
        className={`${this.state.prefixCls}-pagination-prev`}
        onClick={this.jumpPrev}
      >
        <Icon type="left" />
      </li>
    );
  };

  renderPaginationNext: () => React.ReactNode = () => {
    return (
      <li
        className={`${this.state.prefixCls}-pagination-next`}
        onClick={this.jumpNext}
      >
        <Icon type="right" />
      </li>
    );
  };

  renderPaginationItem: () => React.ReactNode = () => {
    const { pageSize = 10, total = 0 } = this.props;
    const { current } = this.state;

    const length = Math.ceil(total / pageSize);

    const pages = [];
    for (let i = 1; i < length + 1; i++) {
      const classes = classNames(`${this.state.prefixCls}-pagination-item`, {
        [`${this.state.prefixCls}-pagination-item-active`]: i === current,
      });

      pages.push(
        <li className={classes} onClick={() => this.hanldeChange(i)}>
          {i}
        </li>,
      );
    }

    return pages;
  };

  renderPagination: () => React.ReactNode = () => {
    const { className, children, style, ...orthers } = this.props;
    const prefixCls = `${this.state.prefixCls}-pagination`;
    const classes = classNames(prefixCls, className);

    return (
      <ul className={classes} {...orthers} style={style}>
        {this.renderPaginationPrev()}
        {this.renderPaginationItem()}
        {this.renderPaginationNext()}
      </ul>
    );
  };

  render(): React.ReactNode {
    return this.renderPagination();
  }
}
