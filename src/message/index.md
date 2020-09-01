## Message

基础分页

```tsx
import React from 'react';
import {Icon} from 'antd'
import { Button } from 'myAntd';
import Notification from './core/Notification';

let notification = null;
Notification.newInstance(Notification => {
  notification = Notification;
});

function messageExaple() {
  notification.add({
    content: <span style={{display:'flex', alignItems: 'center'}}><Icon type="info-circle" theme="filled"  style={{color: '#40a9ff', fontSize: '16px', marginRight: '2px'}}/>谁看江上明月 谁听江风浩荡</span>,
    duration: 2
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
