import React, { Component } from 'react';
import Modal from './Modal';
import { FormattedMessage } from 'react-intl';
import './ModalSignUp.less';

class ModalSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleModal} className="Modal__button">
          Sign up
        </button>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          <div>
            <h1>Welcome to Smoke.io</h1>
            <p className="Modal__about-bold">
              <FormattedMessage
                id="about"
                defaultMessage="Smoke.io runs on the Smoke blockchain allowing our authors to earn real cryptocurrency
              that can be traded for Bitcoin and other altcoins."
              />
            </p>
            <p className="Modal__about">
              Smoke is a blockchain-based rewards platform for publishers to monetize content and
              grow communities like ours. Smoke has its own token called SMOKE. These tokens are
              distributed to content creators and curators daily as rewards, based on community
              voting. Smoke.io is one of the first niche front ends for the Smoke.io chain allowing
              our authors to earn SMOKE for their contributions to Smoke.Network.
            </p>
          </div>
          <a target="_blank" rel="noopener noreferrer" href="#">
            <button className="Modal__button">
              <FormattedMessage id="signup" defaultMessage="Sign up!" />
            </button>
          </a>
        </Modal>
      </div>
    );
  }
}

export default ModalSignUp;
