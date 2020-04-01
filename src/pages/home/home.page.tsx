import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import styled from 'styled-components';
import { Link, i18n } from '@i18n';
import { useTranslation } from 'react-i18next';

import './home.styles.less';

interface Props {
  userAgent?: string;
  currentLanguage?: string;
}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Page: NextPage<Props> = ({ userAgent, currentLanguage }) => {
  const { t } = useTranslation();

  const changeLanguage = (locale, href, as) => {
    i18n.changeLanguage(locale).then(() => Router.replace(href, as));
  };

  return (
    <>
      <Title>{t('hello')} - Homepage with styled-component!</Title>
      <div className="title">{t('hello')} - Homepage with Less style!</div>

      <main>Your user agent: {userAgent}</main>
      <main>Your current language: {currentLanguage}</main>

      {process.env.LOCALES.split(',').map((locale, index) => (
        <button
          key={index}
          onClick={() =>
            changeLanguage(
              locale,
              {
                pathname: '/home/home',
                query: {
                  locale,
                },
              },
              `/${locale}`
            )
          }>
          {locale}
        </button>
      ))}
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  console.log('HOME', ctx);
  const { req } = ctx;
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const currentLanguage = req ? req.language : i18n.language;
  return {
    namespacesRequired: ['common'],
    userAgent,
    currentLanguage,
  };
};

export default Page;
