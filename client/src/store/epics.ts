import { combineEpics } from 'redux-observable';
import { userGitHubEpic } from './github/user';
import { orgGitHubEpic } from './github/org';

export default combineEpics(
  userGitHubEpic,
  orgGitHubEpic
)
