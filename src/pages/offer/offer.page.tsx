import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import Error from '@pages/_error.page';
import styled from 'styled-components';
import withApollo from './../../graphql/withApollo';
import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation } from '@i18n';
import { useQuery } from '@apollo/react-hooks';
import OFFER_QUERY from './offer.query';
import Link from 'next/link';

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
  const { currentLocale, device, ctx } = useGlobalContext();
  const { t } = useTranslation();

  const { data, loading, error, networkStatus } = useQuery(OFFER_QUERY, {
    variables: { id: ctx.query.offerId },
  });

  if (loading) return <p>Loading</p>;
  if (error) {
    return <Error statusCode={404} />;
  }

  const urls = urlManager.getPageUrls(ctx, data.offer);

  if (
    Object.entries(urls[currentLocale].query).toString() !==
    Object.entries(ctx.query).toString()
  )
    return (
      <>
        <Error statusCode={404} />
      </>
    );

  return (
    <>
      <LangSwitch urls={urls} />

      <Title>{t('offer')} - OfferPage with styled-component!</Title>
      <main>Your current locale: {currentLocale}</main>
      <main>Your device: {device}</main>

      {data && (
        <Description>{data.offer.description[currentLocale]}</Description>
      )}

      <Link as={`/${currentLocale}`} href="/home/home">
        <a>Homepage</a>
      </Link>
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  return {
    namespacesRequired: ['common'],
  };
};

export default withApollo(Page);
