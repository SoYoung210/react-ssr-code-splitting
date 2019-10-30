const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babelrc.client');

module.exports =  [
  {
    test: /\.(ts|tsx|js)?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: babelConfig
      },
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
            localIdentName: '[local]_[hash:base64:5]',
          }
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
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
];
