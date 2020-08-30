## Message

基础分页

```tsx
import React from 'react';
import { Button } from 'myAntd';
import Notification from './core/Notification';

let notification = null;
Notification.newInstance(Notification => {
  notification = Notification;
});

function messageExaple() {
  notification.add({
    content: '谁看江上明月 谁听江风浩荡',
  });
}

export default () => (
  <div>
    <Button type="primary" onClick={messageExaple}>
      message
    </Button>
  </div>
);
```
