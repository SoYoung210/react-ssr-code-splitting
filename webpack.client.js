const Jarvis = require('webpack-jarvis');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const join = require('path').join;
const pathResolve = require('path').resolve;
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const PRODUCTION = process.env.NODE_ENV ?
  process.env.NODE_ENV.toLowerCase() === 'production' :
  false;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  const config = {
    entry: ['./client/src/index.tsx'],
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: join(__dirname, './static'),
      publicPath: '/'
    },
    module: {
      rules: [{
          test: /\.(ts|tsx|js)?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
          }, ],
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
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: ['file-loader'],
        },
        {
          test: /\.svg$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000, // 10kb
            },
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 6,
            },
            compress: {
              ecma: 6,
              warnings: false,
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 6,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: true,
        }),
        new OptimizeCSSPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new Jarvis({
        port: 1337,
      }),
      new OptimizeCSSPlugin(),
      new MiniCssExtractPlugin({
        filename: 'app.bundle.css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: pathResolve(__dirname,'./server/views/index.pug'),
        filename: './index.pug'
      }),
      new HtmlWebpackPugPlugin()
    ],
    devServer: {
      compress: true,
      port: 5252,
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '@': pathResolve('client/src')
      },
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js'],
    },
  };

  if (options.mode === 'development') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: PRODUCTION ? false : true,
      })
    );
  }

  return config;
};
