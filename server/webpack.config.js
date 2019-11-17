const pathResolve = require('path').resolve;
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  name: 'server',
  node: {
    __dirname: false,
  },
  entry: './app.ts',
  externals: [nodeExternals()],
  output: {
    filename: 'server.bundle.js',
    path: pathResolve(__dirname, './'),
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
};
