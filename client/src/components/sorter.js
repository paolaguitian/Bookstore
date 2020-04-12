import './css/sorter.css';
import React from 'react';
import { Menu, Dropdown, Button, Radio, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import SortedCatalog from "./sortedCatalog"

const { SubMenu } = Menu;

class Sorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '-1',
      sortby: "",
    }
  }
  
  updateGenre = (e) => {
    this.setState({ genre: e.target.value });
  }

 handleClick =(e) =>  {
    this.setState({
      sortby: e.key
    })
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
            <Dropdown overlay={
              <Menu onClick={this.handleClick} >
              <SubMenu title="title">
              <Menu.Item key="title ascending">ascending</Menu.Item>
                <Menu.Item key="title descending">descending</Menu.Item>
              </SubMenu>
              <SubMenu title="price">
                <Menu.Item key="price ascending">ascending</Menu.Item>
                <Menu.Item key="price descending">descending</Menu.Item>
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
            }>

              <Button>
                Sort by <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <SortedCatalog passgenre={this.state.genre} passsort={this.state.sortby} location={this.props.location}/>
      </div>
    );
  }
}

export default Sorter;
