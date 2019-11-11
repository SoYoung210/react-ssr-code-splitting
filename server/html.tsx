import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { RootStoreState } from '@/store/reducers';

export const renderFullPage = (
  webExtractor: ChunkExtractor, 
  html: string,
  preloadedState: RootStoreState | {}, 
) => {
  return(`
    <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          <title>soso template server</title>
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
          </script>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
  `)
}

export const getHtmlConfigs = (req, appStore) => {
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: EntryRoute } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });

  const tsx = webExtractor.collectChunks(
    <Provider store={ appStore }>
      <StaticRouter location={ req.url }>
        <EntryRoute />
      </StaticRouter>
    </Provider>
  );
  const html = renderToString(
    tsx
  );

  return {
    html,
    webExtractor,
  };
};
