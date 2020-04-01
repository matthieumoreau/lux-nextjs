import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import styled from 'styled-components';
import Link from './../../components/atoms/Link/Link';
import { useTranslation } from 'react-i18next';
import { i18n } from '@i18n';

import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';

import './home.styles.less';

interface Props {
  userAgent?: string;
  currentLanguage?: string;
  url?: any;
}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Page: NextPage<Props> = ({ userAgent, currentLanguage, url }) => {
  const { t } = useTranslation();

  return (
    <>
      <LangSwitch url={url} />
      <Title>{t('hello')} - Homepage with styled-component!</Title>
      <div className="title">{t('hello')} - Homepage with Less style!</div>

      <main>Your user agent: {userAgent}</main>
      <main>Your current language: {currentLanguage}</main>

      <Link href="http://www.google.fr">Google</Link>
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { req, pathname, query, asPath } = ctx;
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const currentLanguage = req ? req.language : i18n.language;

  const url = {
    pathname,
    query,
    asPath,
  };
  return {
    namespacesRequired: ['common'],
    userAgent,
    currentLanguage,
    url,
  };
};

export default Page;
