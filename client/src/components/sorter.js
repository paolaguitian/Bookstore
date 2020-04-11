import './css/sorter.css';
import React from 'react';
import { Menu, Dropdown, Button, Radio, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import SortedCatalog from "./sortedCatalog"


function handleClick(e) {
  message.info('Click on menu item.');
  console.log('sort by', e.key);
}

function onChange(e) {
  console.log(`display books from ${e.target.value} genre`);
}

const { SubMenu } = Menu;

const menu = (
  <Menu onClick={handleClick} >
    <SubMenu title="ratings">
      <Menu.Item key="rating ascending">ascending</Menu.Item>
      <Menu.Item key="rating descending">descending</Menu.Item>
    </SubMenu>
    <SubMenu title="title">
      <Menu.Item key="title ascending">ascending</Menu.Item>
      <Menu.Item key="title descending">descending</Menu.Item>
    </SubMenu>
    <SubMenu title="price">
      <Menu.Item key="price ascending">ascending</Menu.Item>
      <Menu.Item key="price descening">descending</Menu.Item>
    </SubMenu>
    <SubMenu title="date">
      <Menu.Item key="date ascending">ascending</Menu.Item>
      <Menu.Item key="date descending">descending</Menu.Item>
    </SubMenu>
    <SubMenu title="author">
      <Menu.Item key="author ascending">ascending</Menu.Item>
      <Menu.Item key="author descending">descending</Menu.Item>
    </SubMenu>
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

  updateGenre = (e) => {
    this.setState({ genre: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="sortingSelectors">
          <div className="radios">
            Genres:  &nbsp;
          <Radio.Group onChange={this.updateGenre} defaultValue="-1">
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
        <SortedCatalog passgenre={this.state.genre}/>
      </div>
    );
  }
}

export default Sorter;
