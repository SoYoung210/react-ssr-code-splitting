import { combineReducers } from 'redux';
import { loadingState, loadingReducer } from './_modules/loading';
import { userGitHubReducer, UserGitHubState } from './github/user';
import { orgGitHubReducer, OrgGitHubState } from './github/org';

export interface RootStoreState {
  userGitHub: UserGitHubState;
  orgGitHub: OrgGitHubState;
  loading: loadingState;
}

export default combineReducers({ 
  userGitHub: userGitHubReducer,
  orgGitHub: orgGitHubReducer,
  loading: loadingReducer,
});
