import React from 'react';
import classNames from 'classnames';

export interface MetaProps {
  avatar?: React.ReactNode;
  description?: React.ReactNode;
  title?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

export default function Meta({
  avatar,
  description,
  title,
  style,
  className,
  prefixCls = 'pq-antd-meta',
}: MetaProps) {
  const mainClasses = classNames(prefixCls, className);

  return (
    <div className={mainClasses} style={style}>
      {avatar && <div className={`${prefixCls}-avatar`}>{avatar}</div>}
      <div className={`${prefixCls}-detail`}>
        <div className={`${prefixCls}-title`}>{title}</div>
        <div className={`${prefixCls}-description`}>{description}</div>
      </div>
    </div>
  );
}
