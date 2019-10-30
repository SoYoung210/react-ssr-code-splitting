const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const pathResolve = require('path').resolve;
const nodeExternals = require('webpack-node-externals');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const moduleRules = require('./webpack.module');  
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`;

const getOutputConfig = (name) => ({
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js',
  path: pathResolve(__dirname, `static/${name}`),
  publicPath: `/${name}/`,
  libraryTarget: name === 'web' ? 'var' : 'commonjs2'
});

const getResolveConfig = () => ({
  alias: {
    '@': pathResolve('client/src')
  },
  modules: ['node_modules'],
  extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
});

const clientConfig = {
  entry: [hotMiddlewareScript,'./client/src/index.tsx'],
  target: 'web',
  name: 'web',
  output: getOutputConfig('web'),
  module: {
    rules: moduleRules
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
  },
  plugins: [
    new LoadablePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CompressionWebpackPlugin({
      test: new RegExp(`\\.(${['js', 'ts', 'css', 'pcss', 'html'].join('|')})$`),
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 8192,
      cache: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
  ],
  resolve: getResolveConfig(),
};

const nodeRenderConfig = {
  target: 'node',
  name: 'node',
  entry: [pathResolve( './client/src/routes/index.tsx')],
  output: getOutputConfig('node'),
  externals: ['@loadable/component', nodeExternals()],
  module: {
    rules: moduleRules
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
  },
  plugins: [
    new LoadablePlugin(),
    new CompressionWebpackPlugin({
      test: new RegExp(`\\.(${['js', 'ts', 'css', 'pcss', 'html'].join('|')})$`),
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 8192,
      cache: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
  ],
  resolve: getResolveConfig(),
};

module.exports = [clientConfig, nodeRenderConfig]