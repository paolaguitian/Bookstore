import './css/navbar.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBox from '../views/search/search';
import Login from '../views/login/login';

const NavBar = (props) => {
   return (
      <div className="container">
         <nav>
            <label id="hamburger-icon" htmlFor="hamburger">
               &#9776;
            </label>
            <input type="checkbox" id="hamburger" />
            <div className="logo-hamburger">Bookstore 12</div>
            <ul className="navbar">
               <li className="navitem">
                  <div className="logo">Bookstore 12</div>
               </li>
               <li className="navitem">
                  <NavLink to="/home">Home</NavLink>
               </li>
               <li className="navitem">
                  <NavLink to="/bestsellers">Bestsellers</NavLink>
               </li>
               <li className="navitem">
                  <NavLink to="/shop">Shop</NavLink>
               </li>
               <li className="navitem">
                  <NavLink to="/about">About Us</NavLink>
               </li>
               <li className="navlogin">
                  <Login isLoggedIn={props.isLoggedIn} logout={props.logout} />
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default NavBar;
