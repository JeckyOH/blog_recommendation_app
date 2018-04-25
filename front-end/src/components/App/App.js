import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'

import NavBar from '../NavBar/NavBar'
import ArticlePanel from '../ArticlePanel/ArticlePanel'
import LogIn from '../Login/Login'
import SignUp from '../SignUp/SignUp'

import logo from '../../logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">

                <NavBar />

                <Switch>
                  <Route path="/" component={ArticlePanel} exact />
                  <Route path="/login" component={LogIn} />
                  <Route path="/signup" component={SignUp} />
                </Switch>
            </div>
        );
    }
}

export default App;
