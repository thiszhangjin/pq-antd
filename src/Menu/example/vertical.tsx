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
      <Menu style={{ width: 256 }} mode="vertical">
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
              Navigation Three - Submenu
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
            <Menu.Item key="app2" disabled>
              <Icon type="appstore" />
              Navigation Navigation Navigation
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
          <Menu.Item key="app1" disabled>
            <Icon type="appstore" />
            Navigation Navigation Navigation
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
