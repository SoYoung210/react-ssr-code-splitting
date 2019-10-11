import React from 'react';
import express from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import EntryRoute from '../client/src/routes/index';
const app = express();

// if (process.env.NODE_ENV !== 'production') {
//   const webpack = require('webpack');
//   const webpackConfig = require('../webpack.client');

//   const webpackDevMiddleware = require('webpack-dev-middleware');
//   const webpackHotMiddleware = require('webpack-hot-middleware');

//   const compiler = webpack(webpackConfig);

//   app.use(
//     webpackDevMiddleware(compiler, {
//       logLevel: 'silent',
//       publicPath: webpackConfig.output.publicPath,
//     }),
//   );

//   app.use(webpackHotMiddleware(compiler));
// }

app.set('views', path.join(__dirname, '../static'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../static')));

app.get('/ping', (req, res) => {
  res.send('pong!@#');
});

app.get('*',  (req, res) => {
  const html = renderToString(
    <StaticRouter location={req.url}>
      <EntryRoute />
    </StaticRouter>
  );
  res.set('content-type', 'text/html');
  res.send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          <script type="text/javascript" src="/org.bundle.js"></script>
          <script type="text/javascript" src="/user.bundle.js"></script>
          <title>soso template</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script type="text/javascript" src="/main.bundle.js"></script>
          <script type="text/javascript" src="/vendors.bundle.js"></script>
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
