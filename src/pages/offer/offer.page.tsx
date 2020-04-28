import React, { useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import isEqual from 'lodash/isequal';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import Error from '@pages/_error.page';

import withApollo from './../../graphql/withApollo';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation, i18n } from '@i18n';

import OFFER_QUERY from './offer.query';
import Link from '@components/atoms/Link/Link';

import './offer.styles.less';
import urlManager from '@utils/urlManager';

interface Props {}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Description = styled.p`
  color: blue;
  font-size: 15px;
`;

const Page: NextPage<Props> = () => {
  const {
    state: { currentLocale, device, ctx, urls },
    dispatch,
  } = useGlobalContext();
  const { t } = useTranslation();

  const { data, loading, error } = useQuery(OFFER_QUERY, {
    variables: { id: ctx.query.offerId },
    onError: () => <Error statusCode={404} />,
    onCompleted: data => {
      i18n.on('initialized', () => {
        dispatch({
          type: 'SET_URLS',
          payload: urlManager.getPageUrls(ctx, data.offer),
        });
      });
    },
  });

  useEffect(() => {
    if (data) {
      if (!isEqual(urlManager.getPageUrls(ctx, data.offer), urls)) {
        dispatch({
          type: 'SET_URLS',
          payload: urlManager.getPageUrls(ctx, data.offer),
        });
      }
    }
  }, [data, ctx]);

  return (
    <>
      {loading && <p>Loading</p>}
      <Title>{t('offer')} - OfferPage with styled-component!</Title>
      <main>Your current locale: {currentLocale}</main>
      <main>Your device: {device}</main>
      {data && (
        <Description>{data.offer.description[currentLocale]}</Description>
      )}
      <Link href="/home/home">Homepage</Link>
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  return {
    namespacesRequired: ['common'],
  };
};

export default withApollo(Page);
