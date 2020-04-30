import React from 'react';
import { NextPage, NextPageContext } from 'next';

import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import Error from '@pages/_error.page';
import withApollo from '../../hoc/withApollo';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation, i18n } from '@i18n';

import OFFER_QUERY from './offer.query';
import Link from '@components/atoms/Link/Link';

import './offer.styles.less';
import urlManager from '@utils/urlManager';
import { PageSeo } from '@components/organisms/Seo';
import seoManager from '@utils/seoManager';

interface Props {
  isServer: Boolean;
  ctx: any;
}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Description = styled.p`
  color: blue;
  font-size: 15px;
`;

const Page: NextPage<Props> = ({ ctx, isServer }) => {
  const {
    state: { currentLocale, device },
    dispatch,
  } = useGlobalContext();
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(OFFER_QUERY, {
    variables: { id: ctx.query.offerId },
    onCompleted: data => {
      // = useEffect
      i18n.on('initialized', () => {
        dispatch({
          type: 'SET_URLS',
          payload: urlManager.getPageUrls(ctx, data.offer),
        });
      });

      if (!isServer) {
        dispatch({
          type: 'SET_URLS',
          payload: urlManager.getPageUrls(ctx, data.offer),
        });
      }

      return () => {
        i18n.off('initialized', () => {});
      };
    },
  });

  if (error) return <Error statusCode={404} />;

  return (
    <>
      {loading && <p>Loading</p>}

      {data && (
        <PageSeo
          title={seoManager.getOfferTitle(data.offer, currentLocale)}
          description={data.offer.description[currentLocale]}
        />
      )}

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
    isServer: ctx.req ? true : false,
    ctx: {
      pathname: ctx.pathname,
      asPath: ctx.asPath,
      query: ctx.query,
    },
    namespacesRequired: ['common'],
  };
};

export default withApollo(Page);
