const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const configUtils = require('./configUtils');

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseDir = path.resolve(__dirname, '..');

module.exports = {
  entry: path.resolve(baseDir, './src/server/index.js'),
  output: {
    filename: 'busy.server.js',
  },
  target: 'node',
  externals: fs
    .readdirSync(path.resolve(baseDir, 'node_modules'))
    .map(module => ({ [module]: `commonjs ${module}` }))
    .reduce((a, b) => Object.assign({}, a, b), {}),
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    loaders: [
      {
        test: configUtils.MATCH_JS_JSX,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-2'],
            plugins: ['transform-decorators-legacy', 'transform-runtime', 'dynamic-import-node'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(css|less)$/, 'identity-obj-proxy'),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      'process.env.STEEMCONNECT_CLIENT_ID': JSON.stringify(process.env.STEEMCONNECT_CLIENT_ID || 'busy.app'),
      'process.env.STEEMCONNECT_HOST': JSON.stringify(process.env.STEEMCONNECT_HOST),
      'process.env.STEEMJS_URL': JSON.stringify(process.env.STEEMJS_URL),
      'process.env.STEEMJS_WS': JSON.stringify(process.env.STEEMJS_WS),
      'process.env.IS_BROWSER': JSON.stringify(false),
      'process.env.SIGNUP_URL': JSON.stringify(process.env.SIGNUP_URL),
    }),
  ],
};
