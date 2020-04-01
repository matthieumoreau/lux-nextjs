import { NextPage, NextPageContext } from 'next';
import styled from 'styled-components';
import { Link, i18n } from '@i18n';
import { useTranslation } from 'react-i18next';

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
  return (
    <>
      <Title>{t('offer')} - OfferPage with styled-component!</Title>

      <main>Your user agent: {userAgent}</main>
      <main>Your current language: {currentLanguage}</main>

      <Link href={{ pathname: '/[id]', query: { locale: 'fr' } }} as="/fr">
        <button>FR</button>
      </Link>

      <Link href={{ pathname: '/[id]', query: { locale: 'en' } }} as="/en">
        <button>EN</button>
      </Link>
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  console.log('OFFER', ctx);
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
