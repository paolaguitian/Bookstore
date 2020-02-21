import React, { Component } from 'react';
import { Input } from 'antd';
const { Search } = Input;

class SearchBox extends Component {
  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="small"
          onSearch={value => console.log(value)}
        />
      </div>
    )
  }
}

export default SearchBox;