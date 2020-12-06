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
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled>
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
          <Menu.Item key="mail">
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
            <Menu.Item key="app" disabled>
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
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />
            Navigation
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default () => <App />;
