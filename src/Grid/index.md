## Grid

基础栅格

```tsx
import React from 'react';
import { Grid } from 'myAntd';

const { Row, Col } = Grid;

export default () => (
  <div>
    <Row gutter={[0, 16]}>
      <Col span={12}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: 'rgba(0,160,233,.7)',
          }}
        >
          col-12
        </div>
      </Col>
      <Col span={12}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: '#00a0e9',
          }}
        >
          col-12
        </div>
      </Col>
    </Row>
    <Row gutter={[0, 16]}>
      <Col span={8}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: 'rgba(0,160,233,.7)',
          }}
        >
          col-8
        </div>
      </Col>
      <Col span={8}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: '#00a0e9',
          }}
        >
          col-8
        </div>
      </Col>
      <Col span={8}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: 'rgba(0,160,233,.7)',
          }}
        >
          col-8
        </div>
      </Col>
    </Row>
    <Row gutter={[0, 16]}>
      <Col span={6}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: 'rgba(0,160,233,.7)',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: '#00a0e9',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: 'rgba(0,160,233,.7)',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: '#00a0e9',
          }}
        >
          col-6
        </div>
      </Col>
    </Row>
  </div>
);
```

区块间隔

```tsx
import React from 'react';
import { Grid } from 'myAntd';

const { Row, Col } = Grid;

export default () => (
  <div>
    <Row gutter={16}>
      <Col span={6}>
        <div
          style={{
            background: 'rgba(0,160,233,.7)',
            color: '#fff',
            height: '40px',
            lineHeight: '40px',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: 'rgba(0,160,233,.7)',
            color: '#fff',
            height: '40px',
            lineHeight: '40px',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: 'rgba(0,160,233,.7)',
            color: '#fff',
            height: '40px',
            lineHeight: '40px',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: 'rgba(0,160,233,.7)',
            color: '#fff',
            height: '40px',
            lineHeight: '40px',
          }}
        >
          col-6
        </div>
      </Col>
    </Row>
    <Row gutter={[16, 20]}>
      <Col span={6}>
        <div
          style={{
            background: 'rgba(0,160,233,.7)',
            color: '#fff',
            height: '40px',
            lineHeight: '40px',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: 'rgba(0,160,233,.7)',
            color: '#fff',
            height: '40px',
            lineHeight: '40px',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: 'rgba(0,160,233,.7)',
            color: '#fff',
            height: '40px',
            lineHeight: '40px',
          }}
        >
          col-6
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: 'rgba(0,160,233,.7)',
            color: '#fff',
            height: '40px',
            lineHeight: '40px',
          }}
        >
          col-6
        </div>
      </Col>
    </Row>
  </div>
);
```

左右偏移

```tsx
import React from 'react';
import { Grid } from 'myAntd';

const { Row, Col } = Grid;

export default () => (
  <div>
    <Row>
      <Col
        style={{
          background: 'rgba(0,160,233,.7)',
          color: '#fff',
          height: '40px',
          lineHeight: '40px',
          marginTop: 10,
        }}
        span={8}
      >
        col-8
      </Col>
      <Col
        style={{
          background: 'rgba(0,160,233,.7)',
          color: '#fff',
          height: '40px',
          lineHeight: '40px',
          marginTop: 10,
        }}
        span={8}
        offset={8}
      >
        col-8
      </Col>
    </Row>
    <Row>
      <Col
        style={{
          background: 'rgba(0,160,233,.7)',
          color: '#fff',
          height: '40px',
          lineHeight: '40px',
          marginTop: 10,
        }}
        span={6}
        offset={6}
      >
        col-6 col-offset-6
      </Col>
      <Col
        style={{
          background: 'rgba(0,160,233,.7)',
          color: '#fff',
          height: '40px',
          lineHeight: '40px',
          marginTop: 10,
        }}
        span={6}
        offset={6}
      >
        col-6 col-offset-6
      </Col>
    </Row>
    <Row>
      <Col
        style={{
          background: 'rgba(0,160,233,.7)',
          color: '#fff',
          height: '40px',
          lineHeight: '40px',
          marginTop: 10,
        }}
        span={12}
        offset={6}
      >
        col-12 col-offset-6
      </Col>
    </Row>
  </div>
);
```

栅格排序

```tsx
import React from 'react';
import { Grid } from 'myAntd';

const { Row, Col } = Grid;

export default () => (
  <div>
    <Row>
      <Col span={18} push={6}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: '#00a0e9',
          }}
        >
          col-18 col-push-6
        </div>
      </Col>
      <Col span={6} pull={18}>
        <div
          style={{
            height: '40px',
            lineHeight: '40px',
            color: '#fff',
            background: 'rgba(0,160,233,.7)',
          }}
        >
          col-6 col-pull-18
        </div>
      </Col>
    </Row>
  </div>
);
```

Flex 布局

```tsx
import React from 'react';
import { Grid } from 'myAntd';

const { Row, Col } = Grid;

export default () => (
  <div>
    <p>sub-element align left</p>
    <Row type="flex" justify="start">
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
    </Row>

    <p>sub-element align center</p>
    <Row type="flex" justify="center">
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
    </Row>

    <p>sub-element align right</p>
    <Row type="flex" justify="end">
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
    </Row>

    <p>sub-element monospaced arrangement</p>
    <Row type="flex" justify="space-between">
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
    </Row>

    <p>sub-element align full</p>
    <Row type="flex" justify="space-around">
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: 'rgba(0,160,233,.7)',
        }}
      >
        col-4
      </Col>
      <Col
        span={4}
        style={{
          height: '40px',
          lineHeight: '40px',
          color: '#fff',
          background: '#00a0e9',
        }}
      >
        col-4
      </Col>
      <Col span={4}>col-4</Col>
    </Row>
  </div>
);
```
