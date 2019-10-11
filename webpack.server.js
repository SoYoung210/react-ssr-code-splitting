const pathResolve = require('path').resolve;
const babelConfig = require('./babelrc.server');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  name: 'server',
  node: false,
  entry: './server/app.tsx',
  output: {
    filename: 'server.bundle.js',
    path: pathResolve(__dirname, 'static'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig
          }
        ],
      }
    ],
  },
  resolve: {
    alias: {
      '@': pathResolve('client/src'),
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: [nodeExternals()]
};
