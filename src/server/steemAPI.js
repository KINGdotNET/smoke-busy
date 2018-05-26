const createClient = require('lightrpc').createClient;

const options = {
  timeout: 30000,
};

console.log("process.env.STEEMJS_WS=" + process.env.STEEMJS_WS);
console.log("process.env.STEEMJS_URL=" + process.env.STEEMJS_URL);

const client = createClient(process.env.STEEMJS_URL, options);
client.sendAsync = (message, params) =>
  new Promise((resolve, reject) => {
    client.send(message, params, (err, result) => {
      if (err !== null) return reject(err);
      return resolve(result);
    });
  });

module.exports = client;
