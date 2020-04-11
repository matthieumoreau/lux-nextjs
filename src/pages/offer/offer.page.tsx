import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import withApollo from './../../graphql/withApollo';
import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';
import { useGlobalContext } from '@store/GlobalContext';

import { useQuery } from '@apollo/react-hooks';
import OFFER_QUERY from './offer.query';

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
  const { currentLocale, device, url } = useGlobalContext();

  const { data, loading, error } = useQuery(OFFER_QUERY, {
    variables: { id: url.query.offerId },
  });
  const { t } = useTranslation();

  return (
    <>
      {loading && 'Loading'}

      <LangSwitch />
      <Title>{t('offer')} - OfferPage with styled-component!</Title>
      <main>Your current locale: {currentLocale}</main>
      <main>Your device: {device}</main>

      {data && (
        <Description>{data.offer.description[currentLocale]}</Description>
      )}
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  return {
    namespacesRequired: ['common'],
  };
};

export default withApollo(Page);
