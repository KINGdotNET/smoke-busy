import { createClient } from 'lightrpc';

const options = {
  timeout: 15000,
};

const steemUrl = process.env.STEEMJS_URL || 'https://beta.whaleshares.net/ws';

const client = createClient(steemUrl, options);
client.sendAsync = (message, params) =>
  new Promise((resolve, reject) => {
    client.send(message, params, (err, result) => {
      if (err !== null) return reject(err);
      return resolve(result);
    });
  });


////////////////////////////////////////////////////////////////////////////////

let chainLib = require('steem');
chainLib.api.setOptions({url: steemUrl});
chainLib.config.set('address_prefix', 'WLS');
chainLib.config.set('chain_id', 'de999ada2ff7ed3d3d580381f229b40b5a0261aec48eb830e540080817b72866');

// export default client;
export default {
  sendAsync: client.sendAsync,
  chainLib: chainLib
};
