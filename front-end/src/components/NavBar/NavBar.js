import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
          <div>
          <ul>
            <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/login" activeClassName="active">Log In</NavLink></li>
            <li><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li>
          </ul>
          </div>
        );
    }
}

export default NavBar;
