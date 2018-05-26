import { createClient } from 'lightrpc';

const options = {
  timeout: 15000,
};

const client = createClient(process.env.STEEMJS_URL, options);
client.sendAsync = (message, params) =>
  new Promise((resolve, reject) => {
    client.send(message, params, (err, result) => {
      if (err !== null) return reject(err);
      return resolve(result);
    });
  });


////////////////////////////////////////////////////////////////////////////////

let chainLib = require('steem');
chainLib.api.setOptions({url: process.env.STEEMJS_WS});
chainLib.config.set('address_prefix', 'SMK');
chainLib.config.set('chain_id', 'a66e00caa50e6817bbe24e927bf48c5d4ba1b33f36bdbb5fa262a04012c4e3ee');

// export default client;
export default {
  sendAsync: client.sendAsync,
  chainLib: chainLib
};
