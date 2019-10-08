module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-filter-gradient')({
      skipWarnings: true,
    }),
    require('postcss-utilities'),
    require('postcss-pseudo-content-insert'),
    require('postcss-svg'),
    require('postcss-import')({
      path: ['./src/'],
    }),
    require('postcss-nested')
  ],
};
