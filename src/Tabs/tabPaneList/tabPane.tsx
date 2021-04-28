import React from 'react';
import classNames from 'classnames';

export interface TabPaneProps {
  prefixCls?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  active?: boolean;
  tabKey?: string;
  forceRender?: boolean;
  tab?: string | React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
}

export default function TabPane({
  prefixCls,
  id,
  className,
  style,
  active,
  tabKey,
  forceRender,
  children,
}: TabPaneProps) {
  const classes = classNames(
    `${prefixCls}-tablePanel`,
    {
      [`${prefixCls}-active`]: active,
    },
    className,
  );

  return (
    <div
      id={id && `${id}-tablePanel-${tabKey}`}
      className={classes}
      style={style}
    >
      {(active || forceRender) && children}
    </div>
  );
}

TabPane.defaultProps = {
  closable: true,
};
