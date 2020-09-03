## Message

基础分页

```tsx
import React from 'react';
import { Icon } from 'antd';
import { Button, message } from 'myAntd';

function messageExaple(type) {
  message[type]('谁看江上明月 谁听江风浩荡');
}

export default () => (
  <div>
    <Button type="primary" onClick={() => messageExaple('info')}>
      info
    </Button>
    <Button type="primary" onClick={() => messageExaple('error')}>
      error
    </Button>
    <Button type="primary" onClick={() => messageExaple('success')}>
      success
    </Button>
    <Button type="primary" onClick={() => messageExaple('warning')}>
      warning
    </Button>
  </div>
);
```
