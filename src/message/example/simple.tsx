import React from 'react';
import { Button, message } from 'pq-antd';

function messageExaple(type: string) {
  message[type]('谁看江上明月 谁听江风浩荡', 3 , () => {
    console.log(type)
  });
}

export default () => (
  <div>
    <Button onClick={() => messageExaple('info')}>
      info
    </Button>
    <Button onClick={() => messageExaple('error')}>
      error
    </Button>
    <Button onClick={() => messageExaple('success')}>
      success
    </Button>
    <Button onClick={() => messageExaple('warning')}>
      warning
    </Button>
    <Button onClick={() => messageExaple('loading')}>
      loading
    </Button>
  </div>
);
