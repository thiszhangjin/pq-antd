import React from 'react';
import classNames from 'classnames';
import Notification from './core/Notification';

let messageInstance = null;
Notification.newInstance((instance: any) => {
  messageInstance = instance;
});

type types = "success" | "error" | "info" | "warning" | "loading"

// interface

export default messageInstance
