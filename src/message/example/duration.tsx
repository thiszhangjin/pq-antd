import React from 'react';
import { Button, message } from '../../index';

function messageExaple() {
  message.loading('延迟10秒后关闭', 10);
}

export default () => (
  <div>
    <Button onClick={messageExaple}>
      延迟10秒后关闭
    </Button>
  </div>
);
