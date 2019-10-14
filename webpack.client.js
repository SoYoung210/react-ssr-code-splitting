const babelConfig = require('./babelrc.client');
const LoadablePlugin = require('@loadable/webpack-plugin');
const pathResolve = require('path').resolve;
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const PRODUCTION = process.env.NODE_ENV ?
  process.env.NODE_ENV.toLowerCase() === 'production' :
  false;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`;

const getEntryPoint = (target) => {
  if (target === 'node') {
    return ['./client/src/routes/index.tsx']
  } else {
    return  [hotMiddlewareScript, './client/src/index.tsx']
  }
}

const getConfig = (target) => ({
  entry: getEntryPoint(target),
  target,
  name: target,
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: pathResolve(__dirname, `./static/${target}`),
    publicPath: `/${target}/`,
    libraryTarget: target === 'node' ?  'commonjs2' : undefined
  },
  externals: target === 'node' ?
    ['@loadable/component', nodeExternals()]
    : undefined,
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
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.p?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[name]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
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
    })
  ],
  resolve: {
    alias: {
      '@': pathResolve('client/src')
    },
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
})

const getWebConfig = () => {
  const webConfig = getConfig('web');

  return webConfig;
}

const webpackNodeConfig = getConfig('node');
const webpackClientConfig = getWebConfig();


module.exports = [webpackClientConfig, webpackNodeConfig]