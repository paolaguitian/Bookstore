import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBox from '../views/search/search';
import Login from '../views/login/login';
import './css/navbar.css';

const NavBar = () => {
    return (
        <div className="container">
            <nav>
                <ul className="navbar">
                    <li className="navitem"><div className="logo">Bookstore 12</div></li>
                    <li className="navitem"><NavLink to="/home">Home</NavLink></li>
                    <li className="navitem"><NavLink to="/shop">Shop</NavLink></li>
                    <li className="navitem"><NavLink to="/about">About Us</NavLink></li>
                    <li className="navlogin"><Login /></li>
                    <li className="navsearch"><SearchBox /></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;