import loadable from '@loadable/component';
import { Store } from 'redux';
import { orgGitHub } from '@/store/github/org';
import { SEARCH_TYPE } from '@/api';

export interface RouteBranch {
  path: string;
  exact?: boolean;
  component: React.ComponentType<any>;
  loadData?: (params: any) => any;
  routes?: Array<RouteBranch>;
}

const UserView = loadable(
  () => import(/* webpackChunkName: "user" */ '../User'), { ssr: false }
);
const OrgView = loadable(
  () => import(/* webpackChunkName: "org" */'../Org')
);

export const routes: Array<RouteBranch> = [
  {
    path: '/user',
    component: UserView,
  },
  {
    path: '/org',
    component: OrgView,
    loadData: (store: Store) => {
      store.dispatch(
        orgGitHub.fetch({
        targetName: 'facebook',
        userType: SEARCH_TYPE.ORG
      }))
    }
  },
];
