import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootStoreState } from '@/store/reducers';
import { loadingState } from '@/store/_modules/loading';
import { HttpStatusCode, SEARCH_TYPE } from '@/api';
import { OrgGitHubState, orgGitHub, ORG_PREFIX } from '@/store/github/org';
import { Card } from '@/component/Card';

export default () => {
  const fetchState = useSelector<RootStoreState, loadingState>(
    state => state.loading
  );
  const { contents } = useSelector<RootStoreState, OrgGitHubState>(
    state => state.orgGitHub,
  );

  const renderByFetchState = () => {
    const status = fetchState[ORG_PREFIX];

    switch(status) {
      case HttpStatusCode.OK:
        return renderContent();
      default:
        return (
          <div>Loading</div>
        );
    }
  }

  const Header = () => {
    return <h1>Org: Facebook 페이지</h1>
  }

  const renderContent = () => {
    const {
      login,
      type,
      avatar_url,
    } = contents.items[0];

    return (
      <>
        <Card
          imageUrl={avatar_url}
          type={type}
          name={login}
          email='이메일 정보가 오는줄 알았는데..'
        />
      </>
    );
  };

  return (
    <>
      <Header />
      { renderByFetchState() }
    </>
  )
}
