import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBox from '../views/search/search';
import Login from '../views/login/login';
import './css/navbar.css';

const NavBar = (props) => {
    return (
        <div className="container">
            <nav>
                <ul className="navbar">
                    <li className="navitem"><div className="logo">Bookstore 12</div></li>
                    <li className="navitem"><NavLink to="/shop">Shop</NavLink></li>
                    <li className="navitem"><NavLink to="/about">About Us</NavLink></li>
                    <li className="navlogin">
                        <Login isLoggedIn={props.isLoggedIn} />
                    </li>
                    <li className="navsearch"><SearchBox /></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;