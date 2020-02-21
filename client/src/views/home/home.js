import React, { Component } from 'react';
import './home.css';
import SearchBox from '../search/search';
import Login from '../login/login';

class Home extends Component {

  render() {
    return (
      <div className="container">
        <hr className="divider"/>
        <div className="topBar">
          <div className="title">Bookstore 12</div>
          <SearchBox/>
          <Login/>
        </div>
        <div className="booksBar">
          {/* render bookInfo component <BookInfo/> */}
          <p>Book 1</p>
          <p>Book 2</p>
          <p>Book 3</p>
          <p>Book 4</p>
          <p>Book 5</p>
          <p>Book 6</p>
        </div>
      </div>
    );
  }
}

export default Home;