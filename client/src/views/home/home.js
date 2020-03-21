import React from 'react';
import './home.css';
import SearchBox from '../search/search';
import Login from '../login/login';
import BookCatalog from '../../components/bookcatalog';


const Home = (props) =>  {
    return (
      <div className="container">
        <hr className="divider"/>
        <div className="topBar">
          <div className="title">Bookstore 12</div>
          <SearchBox/>
          <Login isLoggedIn={props.isLoggedIn} />
        </div>
        <div className="booksBar">
          {/* render bookInfo component  */}
          <BookCatalog />
        </div>
      </div>
    );
}


export default Home;