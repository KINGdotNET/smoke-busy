import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './HeroBanner.less';

const HeroBanner = ({ visible, location, onCloseClick }) => {
  if (!visible) return null;

  const next = location.pathname.length > 1 ? location.pathname : '';
  return (
    <div className="HeroBanner">
      <a onClick={onCloseClick} role="button" tabIndex="0" className="HeroBanner__close">
        <i className="iconfont icon-close" />
      </a>
      <div className="HeroBanner__container">
        <div className="HeroBanner__container__content">
          <h1>
            <FormattedMessage
              id="hero"
              defaultMessage="Ensuring compensation for the creators of value"
            />
          </h1>
          <div className="HeroBanner__container__content__buttons">
            <a
              className="HeroBanner__container__content__buttons__button HeroBanner__primary"
              target="_blank"
              rel="noopener noreferrer"
              href={process.env.SIGNUP_URL}
            >
              <FormattedMessage id="signup" defaultMessage="Sign up" />
            </a>
            <Link
              className="HeroBanner__container__content__buttons__button HeroBanner__secondary"
              href="/login"
            >
              <FormattedMessage id="login" defaultMessage="Log in" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroBanner.propTypes = {
  location: PropTypes.shape().isRequired,
  visible: PropTypes.bool,
  onCloseClick: PropTypes.func,
};

HeroBanner.defaultProps = {
  visible: true,
  onCloseClick: () => {},
};

export default withRouter(HeroBanner);
