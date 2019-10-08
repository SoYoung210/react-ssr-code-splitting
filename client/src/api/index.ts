import { ajax } from 'rxjs/ajax';

export enum HttpStatusCode {
  LOADING = 0,
  OK = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  LOCKED = 423,
  UNKNOWN = 500
}

// SEARCH_TYPE
export enum SEARCH_TYPE {
  ORG = 'org',
  USER = 'user'
} 

export interface GitHubSearchConfig {
  targetName: string;
  userType: SEARCH_TYPE
}

export function getGitHubProfile(requestPayload: GitHubSearchConfig) {
  const { targetName, userType } = requestPayload;
  const baseUrl = `https://api.github.com/search/users?q=${targetName}`;
  let targetUrl;

  switch (userType) {
    case SEARCH_TYPE.ORG:
      targetUrl = baseUrl.concat('+type%3Aorg&type=Users');
      break;
    case SEARCH_TYPE.USER:
      targetUrl = baseUrl.concat('+type%3Auser&type=User');
      break;
    default:
      targetUrl = baseUrl;
      break;
  }
  console.log('t',targetUrl);
  const response = ajax.getJSON(targetUrl);
  
  return response
}
