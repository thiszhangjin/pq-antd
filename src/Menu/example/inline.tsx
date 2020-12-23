import React from 'react';
import { Icon } from 'antd';
import { Menu } from 'pq-antd';

const { SubMenu } = Menu;

class App extends React.Component {
  state = {};

  render() {
    return (
      <Menu style={{ width: 256 }} mode="inline">
        <Menu.Item key="menu1">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <Menu.Item key="menu2">
          <Icon type="appstore" />
          Navigation Two
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Navigation Three
            </span>
          }
        >
          <Menu.Item key="menu3">
            <Icon type="mail" />
            Navigation One
          </Menu.Item>
          <SubMenu
            key="sub1-1"
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                Submenu
              </span>
            }
          >
            <Menu.Item key="menu4" disabled>
              <Icon type="appstore" />
              Navigation1
            </Menu.Item>
            <Menu.Item key="menu5" disabled>
              <Icon type="appstore" />
              Navigation2
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Submenu
            </span>
          }
        >
          <Menu.Item key="menu6">
            <Icon type="appstore" />
            Navigation1
          </Menu.Item>
          <Menu.Item key="menu7" disabled>
            <Icon type="appstore" />
            Navigation2
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="menu8">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
      </Menu>
    );
  }
}

export default () => <App />;
