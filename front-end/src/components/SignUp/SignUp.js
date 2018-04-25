import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import Auth from '../../lib/Auth';

import './SignUp.css'

class SignUp extends Component {

  constructor(props) {
      super(props);

      this.state = {
        errors: {},
        user: {
          email: '',
          password: '',
          confirm_password: ''
        }
      };

      this.onChange_SignUpForm = this.onChange_SignUpForm.bind(this);
      this.onSubmit_SignUpForm = this.onSubmit_SignUpForm.bind(this);
    }

    onSubmit_SignUpForm(event) {
      event.preventDefault();

      const email = this.state.user.email;
      const password = this.state.user.password;
      const confirm_password = this.state.user.confirm_password;

      if (password != confirm_password) {
        return;
      }

      // Post login data
      fetch('http://localhost:3000/auth/signup', {
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

          this.props.history.push('/login')

        } else {
          response.json().then( res => {
          console.log(res);
          const errors = res.errors ? res.errors : {};
          errors.summary = res.message;
          this.setState({errors});
        });
        }
      });
    }

    validateInput() {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
      if (!regex.test(this.state.user.email)) {
        const errors = this.state.errors;
        errors.email = "Invalid email format.";
        this.setState({errors});
      }
      else {
        const errors = this.state.errors;
        errors.email = '';
        this.setState({errors});
      }

      if (this.state.user.password !== this.state.user.confirm_password) {
        const errors = this.state.errors;
        errors.password = "Password and Confirm Password don't match.";
        this.setState({errors});
      } else {
        const errors = this.state.errors;
        errors.password = '';
        this.setState({errors});
      }
    }

    onChange_SignUpForm(event) {
      const field = event.target.name;
      const user = this.state.user;
      user[field] = event.target.value;

      this.setState({ user });

      this.validateInput();
    }

    renderSignUpForm() {
      return (
          <form className="col s12" action="/" onSubmit={this.onSubmit_SignUpForm}>
            <h4 className="center-align">Sign Up</h4>
            {this.state.errors.summary && <div className="row"><p className="error-message">{this.state.errors.summary}</p></div>}
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" name="email" className="validate" onChange={this.onChange_SignUpForm}/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            {this.state.errors.email && <div className="row"><p className="error-message">{this.state.errors.email}</p></div>}
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" name="password" className="validate" onChange={this.onChange_SignUpForm}/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            {this.state.errors.password && <div className="row"><p className="error-message">{this.state.errors.password}</p></div>}
            <div className="row">
              <div className="input-field col s12">
                <input id="confirm_password" type="password" name="confirm_password" className="validate" onChange={this.onChange_SignUpForm}/>
                <label htmlFor="confirm_password">Confirm Password</label>
              </div>
            </div>
            <div className="row right-align">
              <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value='Sign Up'/>
            </div>
            <div className="row">
              <p className="right-align"> Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </form>
        );
      }

  render() {
    return (
      <div className="container">
        <div className="card-panel signup-panel">
          {this.renderSignUpForm()}
        </div>
      </div>
    );
  }
}

export default SignUp;
