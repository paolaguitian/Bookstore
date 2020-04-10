import React from 'react';
import './home.css';
import SortedCatalog from '../../components/sortedCatalog';


const Home = (props) =>  {
    return (
      <div className="container">
        {/*<hr className="divider"/>
        <div className="topBar">
          <div className="title">Bookstore 12</div>
          <SearchBox/>
          
          <Login />
    </div>*/}
        <div className="booksBar">
          {/* render bookInfo component  */}
          <SortedCatalog />
        </div>
      </div>
    );
}


export default Home;