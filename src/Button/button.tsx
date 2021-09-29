import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import Group from './button-group';

const tuple = <T extends string[]>(...args: T) => args;

const ButtonTypes = tuple('default', 'primary', 'dashed', 'danger');
export type ButtonType = typeof ButtonTypes[number];
const ButtonShapes = tuple('circle', 'round');
export type ButtonShape = typeof ButtonShapes[number];
// const ButtonSizes = tuple('large', 'default', 'small');
// export type ButtonSize = typeof ButtonSizes[number];

interface IProps {
  disabled?: boolean;
  icon?: string;
  loading?: boolean | { delay?: number };
  shape?: ButtonShape;
  type?: ButtonType;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
}
interface IState {
  prefixCls: string;
}

export default class Button extends React.Component<IProps, IState> {
  static Group: typeof Group;

  public readonly state: Readonly<IState> = {
    prefixCls: 'pq-antd',
  };

  public constructor(props: IProps) {
    super(props);
  }

  handleClick = (e: React.MouseEvent): void => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  public renderButton: () => React.ReactNode = () => {
    const prefixCls = `${this.state.prefixCls}-button`;
    const {
      disabled,
      type,
      shape,
      loading,
      icon,
      className,
      children,
      ...orthers
    } = this.props;
    const classes = classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-only-icon`]: icon && !React.isValidElement(children),
        [`${prefixCls}-loading`]: !!loading,
      },
      className,
    );
    let iconNode = null;
    if (loading) {
      iconNode = <Icon type="loading" />;
    } else if (icon) {
      iconNode = <Icon type={icon} />;
    }
    return (
      <button
        type="button"
        className={classes}
        {...orthers}
        onClick={this.handleClick}
        disabled={disabled}
      >
        {iconNode}
        {children ? <span>{children}</span> : ''}
      </button>
    );
  };

  render(): React.ReactNode {
    return this.renderButton();
  }
}
