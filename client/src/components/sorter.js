import './css/sorter.css';
import React from 'react';
import { Menu, Dropdown, Button, Radio, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


function handleClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
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

class Sorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '-1',
      sortby: -1,
    }
  }

  render() {
    return (
      <div className="sortingSelectors">
        <div className="radios">
          Genres:  &nbsp;
          <Radio.Group onChange={onChange} defaultValue="-1">
            <Radio.Button value="-1">All</Radio.Button>
            <Radio.Button value="Action">Action</Radio.Button>
            <Radio.Button value="Romantic-Comedy">Romantic Comedy</Radio.Button>
            <Radio.Button value="Gothic-Fantasy">Gothic Fantasy</Radio.Button>
            <Radio.Button value="Young-Adult">Young Adult</Radio.Button>
            <Radio.Button value="Adventure">Adventure</Radio.Button>
            <Radio.Button value="Horror-Fiction">Horror Fiction</Radio.Button>
            <Radio.Button value="Education">Education</Radio.Button>
            <Radio.Button value="Romance">Romance</Radio.Button>
          </Radio.Group>
        </div>
        <div className="filterby">
          <Dropdown overlay={menu}>
            <Button>
              Sort by <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Sorter;
