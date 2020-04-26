import * as React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { i18n } from '@i18n';
import { useGlobalContext } from '@store/GlobalContext';

const Button = styled.button<{ isActive: boolean }>`
  color: ${props => (props.isActive ? 'green' : 'blue')};
`;

const LangSwitch: React.FunctionComponent = () => {
  const router = useRouter();
  const {
    state: { ctx, currentLocale, urls },
    dispatch,
  } = useGlobalContext();

  const handleClick = (e, locale) => {
    e.preventDefault();
    if (ctx.pathname === '/_error') {
      return window.location.replace(`/${locale}`);
    }
    return i18n.changeLanguage(locale).then(() => {
      return router.push(
        { pathname: urls[locale].pathname, query: urls[locale].query },
        urls[locale].asPath
      );
    });
  };

  return (
    <>
      {process.env.LOCALES.split(',').map((locale, index) => (
        <Button
          key={index}
          onClick={e => handleClick(e, locale)}
          isActive={locale === currentLocale}>
          {locale}
        </Button>
      ))}
    </>
  );
};

export default LangSwitch;
