import React from 'react';
import { Button, message } from '../../index';

function messageExaple() {
  message.loading({
    content: '寒江孤影',
    key: 'updateMessage',
  });
  setTimeout(() => {
    message.success({ content: '江湖故人', key: 'updateMessage', duration: 5 });
  }, 2000);
}

export default () => (
  <div>
    <Button onClick={messageExaple}>更新消息内容</Button>
  </div>
);
