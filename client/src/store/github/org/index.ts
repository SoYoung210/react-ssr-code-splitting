import { handleActions } from 'redux-actions'
import { ACTION_TYPES } from "../../_types/constants";
import { createAsyncAction, createAsyncEpic } from '../../_modules/actionUtils';
import { ActionType } from "../../_types/actionTypes";
import { getGitHubProfile, GitHubSearchConfig, SEARCH_TYPE } from '@/api';

export const ORG_PREFIX = ACTION_TYPES.ORG;

interface GitHubContents {
  login: string
  type: string
  avatar_url: string
}

export interface OrgGitHubState {
  searchConfig: GitHubSearchConfig
  contents: {
    items: Array<GitHubContents>
  }
  errorMessage: string
}

const initialState: OrgGitHubState = {
  searchConfig: {
    targetName: 'soso',
    userType: SEARCH_TYPE.ORG
  },
  contents: {
    items: []
  },
  errorMessage: '',
}

export const orgGitHub = createAsyncAction(ORG_PREFIX);

const reducer = {
  [orgGitHub.FETCH]: (state: OrgGitHubState, action: ActionType): OrgGitHubState => ({
    ...state,
    searchConfig: action.payload,
  }),
  [orgGitHub.SUCCESS]: (state: OrgGitHubState, action: ActionType): OrgGitHubState => ({
    ...state,
    contents: action.payload,
  }),
  [orgGitHub.FAILURE]: (state: OrgGitHubState, action: ActionType): OrgGitHubState => ({
    ...state,
    errorMessage: action.payload,
  }),  
}

export const orgGitHubReducer = handleActions(reducer, initialState)
export const orgGitHubEpic = createAsyncEpic(ORG_PREFIX, getGitHubProfile);
