import React from 'react';
import './home.css';
import Sorter from '../../components/sorter';


const Home = (props) =>  {
    return (
      <div className="container">
        <Sorter location="home"/>
      </div>
    );
}


export default Home;