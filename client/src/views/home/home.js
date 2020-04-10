import React from 'react';
import './home.css';
import SearchBox from '../search/search';
import Login from '../login/login';
import SortedCatalog from '../../components/sortedCatalog';
import Sorter from '../../components/sorter';


const Home = (props) =>  {
    return (
      <div className="container">
        {/*<hr className="divider"/>
        <div className="topBar">
          <div className="title">Bookstore 12</div>
          <SearchBox/>
          
          <Login />
    </div>*/}
    <Sorter />
        <div className="booksBar">
          {/* render bookInfo component  */}
          <SortedCatalog />
        </div>
      </div>
    );
}


export default Home;