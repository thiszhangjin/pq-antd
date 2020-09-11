import * as React from 'react';
import classNames from 'classnames';

export interface ButtonGroupProps {
  style?: React.CSSProperties;
}

const ButtonGroup: React.SFC<ButtonGroupProps> = props => {
  const { ...orthers } = props;
  const classes = classNames('pq-antd-button-group');
  return <div {...orthers} className={classes} />;
};

export default ButtonGroup;
