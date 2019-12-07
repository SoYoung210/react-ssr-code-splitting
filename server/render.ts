import { getStore, loadBranchData } from './util';
import { renderFullPage, getHtmlConfigs } from './html';
import { HttpStatusCode } from '@/api';
import { RootStoreState } from '@/store/reducers';

export const handleRender = (req, res) => {
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