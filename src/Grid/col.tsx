import React from 'react';
import classNames from 'classnames';
import RowContext from './rowContext';

interface IProps {
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
  span?: number;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
interface IState {
  prefixCls: string;
}

export default class Col extends React.Component<IProps, IState> {
  static contextType = RowContext;
  public readonly state: Readonly<IState> = {
    prefixCls: 'myantd',
  };

  public constructor(props: IProps) {
    super(props);
  }

  renderCol: () => React.ReactNode = () => {
    const {
      offset,
      order,
      pull,
      push,
      span,
      className,
      children,
      ...orthers
    } = this.props;
    const prefixCls = `${this.state.prefixCls}-col`;
    const classes = classNames(
      prefixCls,
      {
        [`${prefixCls}-offset-${offset}`]: offset,
        [`${prefixCls}-order-${order}`]: order,
        [`${prefixCls}-pull-${pull}`]: pull,
        [`${prefixCls}-push-${push}`]: push,
        [`${prefixCls}-span-${span}`]: span,
      },
      className,
    );

    return (
      <RowContext.Consumer>
        {gutter => {
          let { style } = orthers;

          if (gutter) {
            style = {
              ...{
                paddingLeft: gutter[0] / 2,
                paddingRight: gutter[0] / 2,
                paddingTop: gutter[1] / 2,
                paddingBottom: gutter[1] / 2,
              },
              ...style,
            };
          }
          return (
            <div className={classes} {...orthers} style={style}>
              {children}
            </div>
          );
        }}
      </RowContext.Consumer>
    );
  };

  render(): React.ReactNode {
    return this.renderCol();
  }
}
