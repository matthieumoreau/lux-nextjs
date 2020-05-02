import React, { useEffect, useState } from 'react';

import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation } from '@i18n';
import Head from '@components/organisms/Head/Head';

const Layout = ({ children }) => {
  const {
    state: { currentLocale, device, ctx, urls, domain },
    dispatch,
  } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <>
      <Head />
      <header>
        <p>HEADER</p>
        <LangSwitch />
      </header>

      <main>{children}</main>

      <footer>
        <p>FOOTER</p>
      </footer>
    </>
  );
};

export default Layout;
