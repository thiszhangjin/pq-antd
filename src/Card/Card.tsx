import React from 'react';
import classNames from 'classnames';
import { Skeleton } from 'antd';
import Meta from './Meta';

export interface CardProps {
  actions?: React.ReactNode[];
  bodyStyle?: React.CSSProperties;
  bordered?: boolean;
  cover?: React.ReactNode;
  extra?: React.ReactNode;
  headStyle?: React.CSSProperties;
  hoverable?: boolean;
  loading?: boolean;
  title?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  children?: React.ReactNode;
}

export default function Card({
  actions,
  bodyStyle,
  bordered = true,
  cover,
  extra,
  headStyle,
  hoverable = false,
  loading = false,
  title,
  style,
  className,
  prefixCls = 'pq-antd-card',
  children,
}: CardProps) {
  function renderHeader(): React.ReactNode {
    const classes = classNames(`${prefixCls}-header`);

    return (
      (title || extra) && (
        <div className={classes} style={headStyle}>
          {title && <div className={`${prefixCls}-header-title`}>{title}</div>}
          {extra && <div className={`${prefixCls}-header-extra`}>{extra}</div>}
        </div>
      )
    );
  }

  function renderCover(): React.ReactNode {
    const classes = classNames(`${prefixCls}-cover`);

    return cover && <div className={classes}>{cover}</div>;
  }

  function renderBody(): React.ReactNode {
    const classes = classNames(`${prefixCls}-body`);

    return (
      children && (
        <div className={classes} style={bodyStyle}>
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 3 }}
            loading={loading}
          >
            {children}
          </Skeleton>
        </div>
      )
    );
  }

  function renderAction(): React.ReactNode {
    const classes = classNames(`${prefixCls}-actions`);

    return (
      Array.isArray(actions) && (
        <div className={classes}>
          {actions.map((item: any) => (
            <div className={`${classes}-item`} key={item.key}>
              {item}
            </div>
          ))}
        </div>
      )
    );
  }

  const mainClasses = classNames(prefixCls, className, {
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-hoverable`]: hoverable,
    [`${prefixCls}-loading`]: loading,
  });

  return (
    <div className={mainClasses} style={style}>
      {renderHeader()}
      {renderCover()}
      {renderBody()}
      {renderAction()}
    </div>
  );
}

Card.Meta = Meta;
