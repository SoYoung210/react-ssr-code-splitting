const pathResolve = require('path').resolve;
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  name: 'server',
  node: false,
  entry: './server/app.ts',
  output: {
    filename: 'server.bundle.js',
    path: pathResolve(__dirname, './static'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      }
    ],
  },
  externals: [nodeExternals()]
};