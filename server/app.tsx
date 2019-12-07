import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import path from 'path';

import webpackConfig from '../webpack.client.js';
import { handleRender } from './render';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  const clientConfig = webpackConfig[0];

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      publicPath: clientConfig.output.publicPath,
    }),
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, '../static')));

// for health check
app.get('/ping', (req, res) => {
  res.send('pong!@#');
});

app.get('*', handleRender);

app.listen(5252, () => {
  console.log('listening on port 5252....');
});
