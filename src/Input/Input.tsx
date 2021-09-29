import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';

type FocusEventHandler = React.FocusEventHandler<HTMLInputElement>;
type FocusEventFun = (e: FocusEventHandler) => void | undefined;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  allowClear?: boolean;
  bordered?: boolean;
  size?: 'large' | 'default' | 'small';
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  maxLength?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (e: any) => void;
  onPressEnter?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onFocus?: FocusEventFun;
  onBlur?: FocusEventFun;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  prefixCls?: string;
  children?: React.ReactNode;
}

function Input(props: InputProps, ref: React.Ref<HTMLInputElement>) {
  const {
    addonAfter,
    addonBefore,
    allowClear,
    bordered = true,
    size = 'default',
    value,
    defaultValue,
    disabled = false,
    prefix,
    suffix,
    onChange,
    onPressEnter,
    onKeyDown,
    onFocus,
    onBlur,
    style,
    className,
    id,
    prefixCls = 'pq-antd-input',
    children,
    ...reset
  } = props;
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState<string | undefined>(
    value || defaultValue,
  );
  const wrapperClass = classNames(`${prefixCls}-wrapper`, className, {
    [`${prefixCls}-wrapper-bordered`]: bordered,
    [`${prefixCls}-wrapper-${size}`]: size,
    [`${prefixCls}-wrapper-focused`]: focused,
    [`${prefixCls}-wrapper-prefix`]: prefix,
    [`${prefixCls}-wrapper-suffix`]: suffix,
  });
  const inputClass = classNames(prefixCls);

  function onFocusChange(
    event: any,
    eventHandle: FocusEventFun,
    value: boolean,
  ) {
    setFocused(value);
    if (eventHandle) {
      eventHandle(event);
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (onPressEnter && e.key === 'Enter') {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  function onInputChange(event: React.ChangeEventHandler<HTMLInputElement>) {
    if (onChange) {
      onChange(event);
    } else {
      setLocalValue(event.target.value);
    }
  }

  function handleClear() {
    setLocalValue('');
  }

  function renderAddon(addon: React.ReactNode, type: 'before' | 'after') {
    return (
      <span className={`${prefixCls}-addon ${prefixCls}-addon-${type}`}>
        {addon}
      </span>
    );
  }

  function renderFix(fix: React.ReactNode, type: 'prefix' | 'suffix') {
    return (
      <span className={`${prefixCls}-fix ${prefixCls}-${type}`}>{fix}</span>
    );
  }

  function renderClear() {
    return (
      <span className={`${prefixCls}-clear`} onClick={handleClear}>
        <Icon type="close-circle" theme="filled" />
      </span>
    );
  }

  return (
    <span className={wrapperClass} style={style}>
      {addonBefore && renderAddon(addonBefore, 'before')}
      {prefix && renderFix(prefix, 'prefix')}
      <input
        className={inputClass}
        id={id}
        value={localValue}
        onFocus={(event) => {
          onFocusChange(event, onFocus as FocusEventFun, true);
        }}
        onBlur={(event) => {
          onFocusChange(event, onBlur as FocusEventFun, false);
        }}
        ref={ref}
        onKeyDown={onInputKeyDown}
        onChange={onInputChange}
        {...reset}
      />
      {allowClear && localValue && renderClear()}
      {suffix && renderFix(suffix, 'suffix')}
      {addonAfter && renderAddon(addonAfter, 'after')}
    </span>
  );
}

export default React.forwardRef(Input);
