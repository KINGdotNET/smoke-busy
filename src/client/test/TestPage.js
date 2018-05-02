import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {loginTest, reload} from "../auth/authActions";
import {connect} from "react-redux";
import {getAuthenticatedUser} from "../reducers";
import {getUserAccountHistory} from "../wallet/walletActions";

@connect(
  state => ({
  }),
  {
    loginTest
  },
)
class TestPage extends React.Component {
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
    console.log("TestPage.handleSubmit: ");
    this.props.loginTest();
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

export default withRouter(TestPage);
