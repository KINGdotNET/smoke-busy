import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {loginWithPostingKey, reload} from "../auth/authActions";
import {connect} from "react-redux";
import {getAuthenticatedUser} from "../reducers";
import {getUserAccountHistory} from "../wallet/walletActions";

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
      <div>
        <h1>TestPage</h1>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        <br />
        <input type="password" name="postingKey" value={this.state.postingKey} onChange={this.handleChange} />
        <br />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    )
  }
}

export default withRouter(Login);
