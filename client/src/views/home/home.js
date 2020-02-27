import React, { Component } from 'react';
import './home.css';
import SearchBox from '../search/search';
import Login from '../login/login';
import HomeBooks from '../../components/bookdetails/homebooks';

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
          <HomeBooks />
        </div>
      </div>
    );
  }
}

export default Home;