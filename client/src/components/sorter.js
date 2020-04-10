import './css/sorter.css';
import React from 'react';
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

function handleClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleClick}>
    <Menu.Item key="1">
      <UserOutlined />
      ratings, high to low
    </Menu.Item>
    <Menu.Item key="2">
      <UserOutlined />
      ratings, low to high
    </Menu.Item>
    <Menu.Item key="3">
      <UserOutlined />
      title, alphabetically
    </Menu.Item>
    <Menu.Item key="4">
      <UserOutlined />
      author, alphabetically
    </Menu.Item>
  </Menu>
);

const Sorter = () => {
  return (
    <div className="menu">
      <Dropdown overlay={menu}>
        <Button>
          Sort by <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default Sorter;
