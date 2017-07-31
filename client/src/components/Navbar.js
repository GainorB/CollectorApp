import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
    if(props.token || props.isLoggedIn){
        return (
            <div>
                <ul>
                    <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/my" activeClassName="active">My Collection</NavLink></li>
                    <li><NavLink to="/add" activeClassName="active">Add Item</NavLink></li>
                </ul>
            </div>
        );
    } else {
        return (
            <div>
                <ul>
                    <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                    <li><NavLink to="/new" activeClassName="active">Register</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default Navbar;