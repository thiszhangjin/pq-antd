import React from 'react';
import { Button, message } from 'pq-antd';

function messageExample() {
  message.loading({
    content: '寒江孤影',
    key: 'updateMessage',
  });
  setTimeout(() => {
    message.success({ content: '江湖故人', key: 'updateMessage', duration: 3 });
  }, 1000);
}

export default () => (
  <div>
    <Button onClick={messageExample}>更新消息内容</Button>
  </div>
);
