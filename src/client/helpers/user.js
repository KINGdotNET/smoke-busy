import { calculateVoteValue } from '../vendor/steemitHelpers';

export const getUserRank = vests => {
  let rank = 'Sober';
  if (vests >= 1000000000) {
    rank = 'In Space';
  } else if (vests >= 100000000) {
    rank = 'Blazed';
  } else if (vests >= 10000000) {
    rank = 'High';
  } else if (vests >= 1000000) {
    rank = 'Buzzed';
  }
  return rank;
};

export const getUserRankKey = vests => {
  let rank = 'Sober';
  if (vests >= 1000000000) {
    rank = 'In Space';
  } else if (vests >= 100000000) {
    rank = 'Blazed';
  } else if (vests >= 10000000) {
    rank = 'High';
  } else if (vests >= 1000000) {
    rank = 'Buzzed';
  }
  return `rank_${rank}`;
};

export const getTotalShares = user =>
  parseFloat(user.vesting_shares) +
  parseFloat(user.received_vesting_shares) +
  -parseFloat(user.delegated_vesting_shares);

export const getHasDefaultSlider = user => getTotalShares(user) >= 10000000;

export const getVoteValue = (user, recentClaims, rewardBalance, rate, weight = 10000) =>
  calculateVoteValue(
    getTotalShares(user),
    parseFloat(recentClaims),
    parseFloat(rewardBalance),
    rate,
    user.voting_power,
    weight,
  );

export default null;
