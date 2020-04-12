import React from 'react';
import './bestsellers.css';
import Sorter from '../../components/sorter';


const Bestsellers = (props) =>  {
    return (
      <div className="container">
        <Sorter location="bestsellers"/>
      </div>
    );
}


export default Bestsellers;