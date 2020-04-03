import { NextPage, NextPageContext } from 'next';
import styled from 'styled-components';
import { Link, i18n } from '@i18n';
import { useTranslation } from 'react-i18next';

import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';
import { useGlobalContext } from '@store/GlobalContext';

interface Props {}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Page: NextPage<Props> = () => {
  const { currentLocale, device, url } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <>
      <LangSwitch />
      <Title>{t('offer')} - OfferPage with styled-component!</Title>

      <main>Your current locale: {currentLocale}</main>
      <main>Your device: {device}</main>
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  return {
    namespacesRequired: ['common'],
  };
};

export default Page;
