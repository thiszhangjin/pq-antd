import React from 'react';
import { Button, notification } from 'pq-antd';

function notificationExample(placement: string) {
  notification.open({
    message: placement,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
}

export default () => (
  <div>
    <Button onClick={() => notificationExample('topLeft')}>topLeft</Button>
    <Button onClick={() => notificationExample('topRight')}>topRight</Button>
    <Button onClick={() => notificationExample('bottomLeft')}>
      bottomLeft
    </Button>
    <Button onClick={() => notificationExample('bottomRight')}>
      bottomRight
    </Button>
  </div>
);
