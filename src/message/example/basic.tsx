import React from 'react';
import { Button, message } from 'pq-antd';

function messageExample(type: string) {
  message[type]('谁看江上明月 谁听江风浩荡', 3, () => {
    console.log(type);
  });
}

export default () => (
  <div>
    <Button onClick={() => messageExample('info')}>info</Button>
    <Button onClick={() => messageExample('error')}>error</Button>
    <Button onClick={() => messageExample('success')}>success</Button>
    <Button onClick={() => messageExample('warning')}>warning</Button>
    <Button onClick={() => messageExample('loading')}>loading</Button>
  </div>
);
