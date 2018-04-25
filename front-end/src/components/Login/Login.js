import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import Auth from '../../lib/Auth';

class Login extends Component {

  constructor(props) {
      super(props);

      this.state = {
        errors: {},
        user: {
          email: '',
          password: ''
        }
      };

      this.onChange_LoginForm = this.onChange_LoginForm.bind(this);
      this.onSubmit_LoginForm = this.onSubmit_LoginForm.bind(this);
    }

    onSubmit_LoginForm(event) {
      event.preventDefault();

      const email = this.state.user.email;
      const password = this.state.user.password;

      // Post login data
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        cache: "no-store",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(response => {
        if (response.status === 200) {
          this.setState({ errors: {} });

          response.json().then( res => {
            console.log(res);
            Auth.authenticateUser(res.token, email);
            this.props.history.push('/')
          });

        } else {
          console.log('Login failed');
          response.json().then( res => {
            const errors = res.errors ? res.errors : {};
            errors.summary = res.message;
            this.setState({errors});
          });
        }
      });
    }

    onChange_LoginForm(event) {
      const field = event.target.name;
      const user = this.state.user;
      user[field] = event.target.value;

      this.setState({ user });
    }

    renderLoginForm() {
      return (
          <form className="col s12" onSubmit={this.onSubmit_LoginForm}>
            <h4 className="center-align">Login</h4>
            {this.state.errors.summary && <div className="row"><p className="error-message">{this.state.errors.summary}</p></div>}
            <div className="row">
              <div className="input-field col s12">
                <input className="validate" id="email" type="email" name="email" onChange={this.onChange_LoginForm}/>
                <label htmlFor='email'>Email</label>
              </div>
            </div>
            {this.state.errors.email && <div className="row"><p className="error-message">{this.state.errors.email}</p></div>}
            <div className="row">
              <div className="input-field col s12">
                <input className="validate" id="password" type="password" name="password" onChange={this.onChange_LoginForm}/>
                <label htmlFor='password'>Password</label>
              </div>
            </div>
            {this.state.errors.password && <div className="row"><p className="error-message">{this.state.errors.password}</p></div>}
            <div className="row right-align">
              <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value='Log in'/>
            </div>
            <div className="row">
              <p className="right-align"> New to Tap News?  <Link to="/signup">Sign Up</Link></p>
            </div>
          </form>
        );
      }

  render() {
    return (
      <div className="container">
        <div className="card-panel login-panel">
          {this.renderLoginForm()}
        </div>
      </div>
    );
  }
}

export default Login;
