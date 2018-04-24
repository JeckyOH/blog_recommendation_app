import PropTypes from 'prop-types'
import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './LoginForm.css';

class LoginForm extends Component {

  render() {
    <div className="container">
      <div className="card-panel login-panel">
        <form className="col s12" action="/" onSubmit={this.props.onSubmit}>
          <h4 className="center-align">Login</h4>
          {this.props.errors.summary && <div className="row"><p className="error-message">{this.props.errors.summary}</p></div>}
          <div className="row">
            <div className="input-field col s12">
              <input className="validate" id="email" type="email" name="email" onChange={this.props.onChange}/>
              <label htmlFor='email'>Email</label>
            </div>
          </div>
          {this.props.errors.email && <div className="row"><p className="error-message">{this.props.errors.email}</p></div>}
          <div className="row">
            <div className="input-field col s12">
              <input className="validate" id="password" type="password" name="password" onChange={this.props.onChange}/>
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          {this.props.errors.password && <div className="row"><p className="error-message">{this.props.errors.password}</p></div>}
          <div className="row right-align">
            <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value='Log in'/>
          </div>
          <div className="row">
            <p className="right-align"> New to Tap News?  <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
    </div>
  </div>
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
