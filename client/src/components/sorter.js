import './css/sorter.css';
import React from 'react';
import { Menu, Dropdown, Button, Radio, Rate } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SortedCatalog from "./sortedCatalog"

const { SubMenu } = Menu;

class Sorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '-1',
      sortby: "",
      rating: 0,
    }
  }
  
  updateGenre = (e) => {
    this.setState({ genre: e.target.value });
  }

  updateRating = (e) => {
    //console.log(typeof e);
    this.setState({ rating: e });
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
          <div> Min rating: &nbsp; <Rate defaultValue={0} onChange={this.updateRating}/>  </div>
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
        <SortedCatalog genre={this.state.genre} 
                       sort={this.state.sortby} 
                       location={this.props.location} 
                       rating={this.state.rating} />
      </div>
    );
  }
}

export default Sorter;
