import React, { useState } from 'react';
import { Icon } from 'antd';
import Input, { InputProps } from './Input';

export interface PasswordProps extends InputProps {
  visibilityToggle?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
}

export default function Password(props: PasswordProps) {
  const { visibilityToggle = true, iconRender, ...reset } = props;
  const [visible, setVisible] = useState<boolean>(false);

  function handleChangeVisible() {
    setVisible(!visible);
  }

  function renderIcon(): React.ReactNode {
    if (!visibilityToggle) {
      return null;
    }
    if (iconRender) {
      return iconRender(visible);
    }
    return (
      <Icon
        type={!visible ? 'eye' : 'eye-invisible'}
        onClick={handleChangeVisible}
      />
    );
  }

  return (
    <Input
      {...reset}
      className="pq-antd-password"
      type={!visible ? 'password' : 'text'}
      suffix={renderIcon()}
    />
  );
}
