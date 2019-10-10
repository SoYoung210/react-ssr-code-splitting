import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@/component/Card';
import { userGitHub, USER_PREFIX, UserGitHubState } from '@/store/github/user';
import { RootStoreState } from '@/store/reducers';
import { loadingState } from '@/store/_modules/loading';
import { HttpStatusCode, SEARCH_TYPE } from '@/api';

import './styles.pcss';

export default () => {
  const fetchState = useSelector<RootStoreState, loadingState>(
    state => state.loading
  );
  const { contents } = useSelector<RootStoreState, UserGitHubState>(
    state => state.userGitHub,
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(userGitHub.fetch({
      targetName: 'SoYoung210',
      userType: SEARCH_TYPE.USER
    }));
  }, [])

  const renderByFetchState = () => {
    const status = fetchState[USER_PREFIX];

    switch(status) {
      case HttpStatusCode.OK:
        return renderContent();
      default:
        return (
          <div>Loading</div>
        );
    }
  }

  const renderContent = () => {
    const {
      login,
      type,
      avatar_url,
    } = contents.items[0];

    return (
      <>
        <h1>User: SoYoung210 페이지</h1>
        <Card
          imageUrl={avatar_url}
          type={type}
          name={login}
          email='이메일 정보가 오는줄 알았는데..'
        />
      </>
    );
  };

  return renderByFetchState();
}
