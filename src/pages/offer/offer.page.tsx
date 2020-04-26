import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Error from '@pages/_error.page';
import styled from 'styled-components';
import withApollo from './../../graphql/withApollo';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation } from '@i18n';
import { useQuery } from '@apollo/react-hooks';
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
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_URLS',
        payload: urlManager.getPageUrls(ctx, data.offer),
      });
    }
  }, [ctx, data]);

  // if (
  //   Object.entries(urls[currentLocale].query).toString() !==
  //   Object.entries(ctx.query).toString()
  // )
  //   return (
  //     <>
  //       <Error statusCode={404} />
  //     </>
  //   );

  return (
    <>
      {loading && <p>Loading</p>}
      <Title>{t('offer')} - OfferPage with styled-component!</Title>
      <main>Your current locale: {currentLocale}</main>
      <main>Your device: {device}</main>
      {data && (
        <Description>{data.offer.description[currentLocale]}</Description>
      )}
      <Link href="/home/home">Homepage </Link>
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  return {
    namespacesRequired: ['common'],
  };
};

export default withApollo(Page);
