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
    prefixCls: 'myantd',
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
      children,
      ...orthers
    } = this.props;
    const classes = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-only-icon`]: icon && !children,
      [`${prefixCls}-loading`]: !!loading,
    });

    return (
      <button
        type="button"
        className={classes}
        {...orthers}
        onClick={this.handleClick}
        disabled={disabled}
      >
        {loading ? <Icon type="loading" /> : icon ? <Icon type={icon} /> : ''}
        {children ? <span>{children}</span> : ''}
      </button>
    );
  };

  render(): React.ReactNode {
    return this.renderButton();
  }
}
