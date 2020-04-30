import React, { useEffect, useState } from 'react';

import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation } from '@i18n';
import { DefaultSeo } from '@components/organisms/Seo';

const Layout = ({ children }) => {
  const {
    state: { currentLocale, device, ctx, urls, domain },
    dispatch,
  } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <>
      <DefaultSeo title="default title" description="default desc" />
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
