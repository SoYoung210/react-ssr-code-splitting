import React from 'react';
import express from 'express';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
const pathResolve = require('path').resolve;
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.client.js';
// import EntryRoute from '../client/src/routes/index';
const app = express();

if (process.env.NODE_ENV !== 'production') {
  console.log('@@ webpackConfig @@', webpackConfig);

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      publicPath: webpackConfig[0].output.publicPath,
    }),
  );

  app.use(webpackHotMiddleware(compiler));
}

app.set('views', path.join(__dirname, '../static'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../static')));

app.get('/ping', (req, res) => {
  res.send('pong!@#');
});

app.get('*',  (req, res) => {
  const nodeStats = pathResolve(__dirname, './node/loadable-stats.json');
  const webStats = pathResolve(__dirname, './web/loadable-stats.json');
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
  res.send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          <title>soso template server</title>
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
  `);
  // res.render('index');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404);
  res.redirect('/errors/page-not-found');
});

app.listen(5252, () => {
  console.log('listening on port 5252....');
});
