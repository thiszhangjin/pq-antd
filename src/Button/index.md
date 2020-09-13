## Button

按钮类型：主按钮、次按钮、虚线按钮、危险按钮

```tsx
import React from 'react';
import { Button } from 'myAntd';

export default () => (
  <div>
    <Button type="primary">primary</Button>
    <Button>default</Button>
    <Button type="dashed">dashed</Button>
    <Button type="danger">danger</Button>
  </div>
);
```

图标按钮

```tsx
import React from 'react';
import { Icon } from 'antd';
import { Button } from 'myAntd';

export default () => (
  <div>
    <Button type="primary" icon="download">
      Download
    </Button>
    <Button type="primary" shape="circle" icon="search"></Button>
    <Button type="primary" shape="round" icon="search"></Button>
    <Button type="primary" shape="round" icon="download">
      Download
    </Button>
    <Button type="primary" loading={true}>
      Loding
    </Button>
  </div>
);
```

按钮形状

```tsx
import React from 'react';
import { Icon } from 'antd';
import { Button } from 'myAntd';

export default () => (
  <div>
    <Button type="primary" shape="circle">
      C
    </Button>
    <Button shape="circle" icon="search"></Button>
    <Button type="danger" shape="round">
      C
    </Button>
    <Button type="dashed" shape="round" icon="search"></Button>
    <Button type="primary" shape="round" icon="download">
      Download
    </Button>
  </div>
);
```

多个按钮组合

```tsx
import React from 'react';
import { Icon } from 'antd';
import { Button } from 'myAntd';

const handleClick = (e: React.MouseEvent) => {
  alert('click');
};

export default () => (
  <div>
    <Button.Group>
      <Button type="primary" shape="circle" onClick={handleClick}>
        <Icon type="left" />
        Backward
      </Button>
      <Button type="primary">
        Forward
        <Icon type="right" />
      </Button>
    </Button.Group>
  </div>
);
```

不可用状态

```tsx
import React from 'react';
import { Button } from 'myAntd';

export default () => (
  <div>
    <Button type="primary">primary</Button>
    <Button type="primary" disabled>
      primary
    </Button>
    <Button>default</Button>
    <Button disabled>default</Button>
    <Button type="dashed">dashed</Button>
    <Button type="dashed" disabled>
      dashed
    </Button>
    <Button type="danger">danger</Button>
    <Button type="danger" disabled>
      danger
    </Button>
  </div>
);
```
