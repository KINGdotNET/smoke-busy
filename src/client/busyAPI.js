import { Client } from 'busyjs';

console.log("process.env.STEEMJS_WS=" + process.env.STEEMJS_WS);
console.log("process.env.STEEMJS_URL=" + process.env.STEEMJS_URL);

const client = new Client(process.env.STEEMJS_WS);

client.sendAsync = (message, params) =>
  new Promise((resolve, reject) => {
    client.call(message, params, (err, result) => {
      if (err !== null) return reject(err);
      return resolve(result);
    });
  });

export default client;
