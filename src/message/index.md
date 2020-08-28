## Message

基础分页

```tsx
import React from 'react';
import { Button } from 'myAntd';
import Notification from './core/Notification';

let notification = null;
Notification.newInstance((Notification) => {
  notification = Notification;
});

function messageExaple(){
  notification.add({});
}

export default () => (
  <div>
    <Button type="primary" onClick={messageExaple}>message</Button>
  </div>
);
```
