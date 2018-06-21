import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import formatter from '../helpers/steemitFormatter';
import { calculateTotalDelegatedSP, calculateEstAccountValue } from '../vendor/steemitHelpers';
import BTooltip from '../components/BTooltip';
import Loading from '../components/Icon/Loading';
import USDDisplay from '../components/Utils/USDDisplay';
import './UserWalletSummary.less';

const getFormattedTotalDelegatedSP = (user, totalVestingShares, totalVestingFundSteem) => {
  const totalDelegatedSP = calculateTotalDelegatedSP(
    user,
    totalVestingShares,
    totalVestingFundSteem,
  );

  if (totalDelegatedSP !== 0) {
    return (
      <BTooltip
        title={
          <span>
            <FormattedMessage
              id="steem_power_delegated_to_account_tooltip"
              defaultMessage="Smoke Power delegated to this account"
            />
          </span>
        }
      >
        <span>
          {totalDelegatedSP > 0 ? '(+' : '('}
          <FormattedNumber
            value={calculateTotalDelegatedSP(user, totalVestingShares, totalVestingFundSteem)}
          />
          {' SP)'}
        </span>
      </BTooltip>
    );
  }

  return null;
};

const UserWalletSummary = ({
  user,
  loading,
  totalVestingShares,
  totalVestingFundSteem,
  loadingGlobalProperties,
  steemRate,
  sbdRate,
  steemRateLoading,
}) => (
  <div className="UserWalletSummary">
    <div className="UserWalletSummary__item">
      <img src="/images/icons/black-white-icon-39x39.png" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="smoke" defaultMessage="Smoke" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.balance)} />
            {' SMOKE'}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-flashlight_fill UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="smoke_power" defaultMessage="Smoke Power" />
      </div>
      <div className="UserWalletSummary__value">
        {loading || loadingGlobalProperties ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber
              value={parseFloat(
                formatter.vestToSteem(
                  user.vesting_shares,
                  totalVestingShares,
                  totalVestingFundSteem,
                ),
              )}
            />
            {' SP '}
            {getFormattedTotalDelegatedSP(user, totalVestingShares, totalVestingFundSteem)}
          </span>
        )}
      </div>
    </div>  
  </div>
);

UserWalletSummary.propTypes = {
  loadingGlobalProperties: PropTypes.bool.isRequired,
  user: PropTypes.shape().isRequired,
  totalVestingShares: PropTypes.string.isRequired,
  totalVestingFundSteem: PropTypes.string.isRequired,
  steemRate: PropTypes.number,
  sbdRate: PropTypes.number,
  loading: PropTypes.bool,
  steemRateLoading: PropTypes.bool,
};

UserWalletSummary.defaultProps = {
  steemRate: 1,
  sbdRate: 1,
  loading: false,
  steemRateLoading: false,
};

export default UserWalletSummary;
