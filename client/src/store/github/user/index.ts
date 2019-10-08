import { handleActions } from 'redux-actions'
import { ACTION_TYPES } from "../../_types/constants";
import { createAsyncAction, createAsyncEpic } from '../../_modules/actionUtils';
import { ActionType } from "../../_types/actionTypes";
import { getGitHubProfile, GitHubSearchConfig, SEARCH_TYPE } from '@/api';

export const USER_PREFIX = ACTION_TYPES.USER;

interface GitHubContents {
  login: string
  type: string
  avatar_url: string
}

export interface UserGitHubState {
  searchConfig: GitHubSearchConfig
  contents: {
    items: Array<GitHubContents>
  }
  errorMessage: string
}

const initialState: UserGitHubState = {
  searchConfig: {
    targetName: 'SoYoung210',
    userType: SEARCH_TYPE.USER
  },
  contents: {
    items: []
  },
  errorMessage: '',
}

export const userGitHub = createAsyncAction(USER_PREFIX);

const reducer = {
  [userGitHub.FETCH]: (state: UserGitHubState, action: ActionType): UserGitHubState => ({
    ...state,
    searchConfig: action.payload,
  }),
  [userGitHub.SUCCESS]: (state: UserGitHubState, action: ActionType): UserGitHubState => ({
    ...state,
    contents: action.payload,
  }),
  [userGitHub.FAILURE]: (state: UserGitHubState, action: ActionType): UserGitHubState => ({
    ...state,
    errorMessage: action.payload,
  }),  
}

export const userGitHubReducer = handleActions(reducer, initialState)
export const userGitHubEpic = createAsyncEpic(USER_PREFIX, getGitHubProfile);
