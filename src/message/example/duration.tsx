import React from 'react';
import { Button, message } from 'pq-antd';

function messageExample() {
  message.loading('延迟10秒后关闭', 10);
}

export default () => (
  <div>
    <Button onClick={messageExample}>延迟10秒后关闭</Button>
  </div>
);
