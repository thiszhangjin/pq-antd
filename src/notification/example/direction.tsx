import React from 'react';
import { Button, notification } from 'pq-antd';

function notificationExaple(placement: string) {
  notification.open({
    message: placement,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
}

export default () => (
  <div>
    <Button onClick={() => notificationExaple('topLeft')}>topLeft</Button>
    <Button onClick={() => notificationExaple('topRight')}>topRight</Button>
    <Button onClick={() => notificationExaple('bottomLeft')}>bottomLeft</Button>
    <Button onClick={() => notificationExaple('bottomRight')}>
      bottomRight
    </Button>
  </div>
);
