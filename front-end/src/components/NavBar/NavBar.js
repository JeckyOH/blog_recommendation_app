import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'

import Auth from '../../lib/Auth'

import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo center">Happy Reading</NavLink>
                <ul id="nav-mobile" className="right">
                  {Auth.isUserAuthenticated() ?
                    (<div>
                      <li><NavLink to="#">{Auth.getEmail()}</NavLink></li>
                      <li><NavLink to="/logout">Log out</NavLink></li>
                    </div>)
                    :
                    (<div>
                      <li><NavLink to="/login">Log In</NavLink></li>
                      <li><NavLink to="/signup">Sign up</NavLink></li>
                    </div>)
                  }
                </ul>
              </div>
            </nav>
            <br/>
          </div>
        );
    }
}

export default NavBar;
