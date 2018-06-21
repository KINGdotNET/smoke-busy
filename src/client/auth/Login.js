import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {loginWithPostingKey, reload} from "../auth/authActions";
import {connect} from "react-redux";
import {getAuthenticatedUser} from "../reducers";
import {getUserAccountHistory} from "../wallet/walletActions";
import { FormattedMessage } from 'react-intl';
import '../components/LoginModal.less';

@connect(
  state => ({
  }),
  {
    loginWithPostingKey
  },
)
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      postingKey: ''
    };
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.loginWithPostingKey(this.state.username, this.state.postingKey);
  };

  render() {
    return (
        <div className="LoginModal__body">
          <img src="/images/logo-brand.png" className="LoginModal__icon" />
          <span className="LoginModal__login-title">
            <FormattedMessage id="login_to_smoke" defaultMessage="Login to Smoke.io" />
          </span>
          <span className="LoginModal__login-description">
            <FormattedMessage
              id="login_modal_description_smoke"
              defaultMessage="Login with your postingKey to use Smoke.io"
            />
          </span>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          <br />
          <input type="password" name="postingKey" value={this.state.postingKey} onChange={this.handleChange} />
          <button className="LoginModal__login-button" onClick={this.handleSubmit}>
            {/*<FormattedMessage*/}
              {/*id="login_with_steemconnect"*/}
              {/*defaultMessage="Login with SteemConnect"*/}
            {/*/>*/}
            Login
          </button>
        </div>
    )
  }
}

export default withRouter(Login);
