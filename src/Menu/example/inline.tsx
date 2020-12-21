import React from 'react';
import { Icon } from 'antd';
import { Menu } from '../../index';

const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu style={{ width: 256 }} mode="inline">
        <Menu.Item key="dkdsa">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <Menu.Item key="app34" disabled>
          <Icon type="appstore" />
          Navigation Two
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Navigation Three
            </span>
          }
        >
          <Menu.Item key="mail2332">
            <Icon type="mail" />
            Navigation One
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                Submenu
              </span>
            }
          >
            <Menu.Item key="Navigation1" disabled>
              <Icon type="appstore" />
              Navigation1
            </Menu.Item>
            <Menu.Item key="Navigation2" disabled>
              <Icon type="appstore" />
              Navigation2
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Submenu
            </span>
          }
        >
          <Menu.Item key="Navigation12" disabled>
            <Icon type="appstore" />
            Navigation1
          </Menu.Item>
          <Menu.Item key="Navigation23" disabled>
            <Icon type="appstore" />
            Navigation2
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="mail1">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
      </Menu>
    );
  }
}

export default () => <App />;
