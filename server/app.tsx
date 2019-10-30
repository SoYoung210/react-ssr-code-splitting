import React from 'react';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';


import webpackConfig from '../webpack.client.js/index.js';
import { renderFullPage } from './html';

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

app.get('/ping', (req, res) => {
  res.send('pong!@#');
});

app.get('*',  (req, res) => {
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: EntryRoute } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });

  const tsx = webExtractor.collectChunks(
    <StaticRouter location={req.url}>
      <EntryRoute />
    </StaticRouter>
  )
  const html = renderToString(tsx);

  res.set('content-type', 'text/html');
  res.send(renderFullPage(webExtractor, html));
});

app.listen(5252, () => {
  console.log('listening on port 5252....');
});
