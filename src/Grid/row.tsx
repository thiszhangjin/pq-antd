import React from 'react';
import classNames from 'classnames';
import RowContext from './rowContext';

const tuple = <T extends string[]>(...args: T) => args;
const AlignTypes = tuple('top', 'middle', 'bottom');
export type AlignType = typeof AlignTypes[number];
const JustifyTypes = tuple(
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
);
export type JustifyType = typeof JustifyTypes[number];

interface IProps {
  align?: AlignType;
  gutter?: number | number[];
  justify?: JustifyType;
  type?: 'flex';
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
interface IState {
  prefixCls: string;
}

export default class Row extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    prefixCls: 'pq-antd',
  };

  public constructor(props: IProps) {
    super(props);
  }

  getGutter = (): [number, number] => {
    const results: [number, number] = [0, 0];
    const { gutter } = this.props;
    if (gutter) {
      if (Array.isArray(gutter)) {
        results[0] = gutter[0] || 0;
        results[1] = gutter[1] || 0;
      } else {
        results[0] = gutter;
      }
    }
    return results;
  };

  renderRow: () => React.ReactNode = () => {
    const {
      align,
      justify,
      type,
      children,
      style,
      className,
      ...orthers
    } = this.props;
    const prefixCls = type
      ? `${this.state.prefixCls}-row-${type}`
      : `${this.state.prefixCls}-row`;
    const classes = classNames(
      prefixCls,
      {
        [`${prefixCls}-${align}`]: align,
        [`${prefixCls}-${justify}`]: justify,
      },
      className,
    );
    const gutter = this.getGutter();
    const rowStyle = {
      ...{
        marginLeft: -gutter[0] / 2,
        marginRight: -gutter[0] / 2,
        marginTop: -gutter[1] / 2,
        marginBottom: -gutter[1] / 2,
      },
      ...style,
    };

    return (
      <RowContext.Provider value={gutter}>
        <div className={classes} {...orthers} style={rowStyle}>
          {children}
        </div>
      </RowContext.Provider>
    );
  };

  render(): React.ReactNode {
    return this.renderRow();
  }
}
