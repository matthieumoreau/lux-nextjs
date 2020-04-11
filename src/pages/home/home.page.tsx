import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Link from '@components/atoms/Link/Link';
import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';

import { useGlobalContext } from '@store/GlobalContext';

import './home.styles.less';

interface Props {}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Page: NextPage<Props> = () => {
  const { currentLocale, device } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <>
      <LangSwitch />
      <Title>{t('hello')} - Homepage with styled-component!</Title>
      <div className="title">{t('hello')} - Homepage with Less style!</div>

      <main>Your current locale: {currentLocale}</main>
      <main>Your device: {device}</main>

      <Link href="http://www.google.fr">Google</Link>
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => ({
  namespacesRequired: ['common'],
});

export default Page;
