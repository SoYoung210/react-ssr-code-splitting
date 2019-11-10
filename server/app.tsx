import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import path from 'path';

import webpackConfig from '../webpack.client.js';
import { renderFullPage, getHtmlConfigs } from './html';
import { getStore, loadBranchData } from './util';
import { HttpStatusCode } from '@/api';
import { RootStoreState } from '@/store/reducers';

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

const handleRender = (req, res) => {
  try {
    const appStore = getStore();
   
    loadBranchData(req.url)(appStore).then((data) => {
      if (data.every((data) => data === null)) {
        const config = getHtmlConfigs(req, appStore);
        const { html, webExtractor } = config;
        res.send(renderFullPage(webExtractor,html, {}));

        return;
      } 

      const unsubscribe = appStore.subscribe(() => {
        const config = getHtmlConfigs(req, appStore);
        const finalState: RootStoreState = appStore.getState();
        const loadingKeys = Object.keys(finalState.loading);
        const { html, webExtractor } = config;
        const fetchState: Array<boolean> = new Array(loadingKeys.length).fill(false);

        loadingKeys.forEach((key: string, index: number) => {
          const isFetched = finalState.loading[key] !== HttpStatusCode.LOADING;

          fetchState[index] = isFetched;
        });
  
        const isAllFetched = fetchState.every((state) => state);
        if (isAllFetched) {
          unsubscribe();
          res.send(renderFullPage(webExtractor, html, finalState));

          return;
        }
      });
    });
  } catch(e) {
    console.log('e', e);
  }
};

app.get('*', handleRender);

app.listen(5252, () => {
  console.log('listening on port 5252....');
});
