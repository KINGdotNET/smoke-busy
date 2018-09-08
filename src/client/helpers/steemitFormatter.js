// https://github.com/steemit/steem-js/blob/1ebe788987d395af5fd8c80c1bbf06e24614a86c/src/api/methods.js
import steemAPI from '../steemAPI';

// Vendor file - disable eslint
/* eslint-disable */
const createFormatter = api => {
  function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function vestingSteem(account, gprops) {
    const vests = parseFloat(account.vesting_shares.split(' ')[0]);
    const total_vests = parseFloat(gprops.total_vesting_shares.split(' ')[0]);
    const total_vest_steem = parseFloat(gprops.total_vesting_fund_steem.split(' ')[0]);
    const vesting_steemf = total_vest_steem * (vests / total_vests);
    return vesting_steemf;
  }

  function estimateAccountValue(
    account,
    { gprops, vesting_steem } = {},
  ) {
    const promises = [];
    const username = account.name;
    const assetPrecision = 1000;

    if (!vesting_steem) {
      if (!gprops) {
        promises.push(
          api.sendAsync('get-state', [`/@${username}`]).then(data => {
            gprops = data.props;
            vesting_steem = vestingSteem(account, gprops);
          }),
        );
      } else {
        vesting_steem = vestingSteem(account, gprops);
      }
    }

    return Promise.all(promises).then(() => {
      const balance_steem = parseFloat(account.balance.split(' ')[0]);
      const total_steem = vesting_steem + balance_steem;
      return (total_steem).toFixed(2);
    });
  }

  return {
    reputation(reputation) {
      if (reputation == null) return reputation;
      reputation = parseInt(reputation);
      let rep = String(reputation);
      const neg = rep.charAt(0) === '-';
      rep = neg ? rep.substring(1) : rep;
      const str = rep;
      const leadingDigits = parseInt(str.substring(0, 4));
      const log = Math.log(leadingDigits) / Math.log(10);
      const n = str.length - 1;
      let out = n + (log - parseInt(log));
      if (isNaN(out)) out = 0;
      out = Math.max(out - 9, 0);
      out = (neg ? -1 : 1) * out;
      out = out * 9 + 25;
      out = parseInt(out);
      return out;
    },

    vestToSteem(vestingShares, totalVestingShares, totalVestingFundSteem) {
      return (
        parseFloat(totalVestingFundSteem) *
        (parseFloat(vestingShares) / parseFloat(totalVestingShares))
      );
    },

    commentPermlink(parentAuthor, parentPermlink) {
      const timeStr = new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]+/g, '')
        .toLowerCase();
      parentPermlink = parentPermlink.replace(/(-\d{8}t\d{9}z)/g, '');
      return `re-${parentAuthor}-${parentPermlink}-${timeStr}`;
    },

    amount(amount, asset) {
      return `${amount.toFixed(3)} ${asset}`;
    },
    numberWithCommas,
    vestingSteem,
    estimateAccountValue,
  };
};

export default createFormatter(steemAPI);
