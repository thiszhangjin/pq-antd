import React from 'react';
import { Avatar, Icon } from 'antd';
import { Card } from 'pq-antd';

const { Meta } = Card;

class App extends React.Component {
  state = {};

  render() {
    return (
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
        actions={[
          <Icon type="setting" key="setting" />,
          <Icon type="edit" key="edit" />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="Europe Street beat"
          description="www.instagram.com"
        />
      </Card>
    );
  }
}

export default () => <App />;
