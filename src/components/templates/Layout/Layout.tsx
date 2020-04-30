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
      <DefaultSeo
        title="default title"
        description="default desc"
        jsonLd={[
          {
            '@context': 'http://schema.org',
            '@type': 'Organization',
            '@id': { domain },
            name: 'Lux-residence',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '65 rue Ordener',
              addressLocality: 'Paris, France',

              postalCode: 'F-75018',
              addressCountry: 'FR',
            },
            image: [],
            url: `${domain}${ctx.asPath}`,
            logo: 'http://www.example.com/logo.png',
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '33-1-53-38-80-00',
                contactType: 'customer support',
                areaServed: 'FR',
                contactOption: "Coût d'un appel local",
              },
            ],
          },
        ]}
      />
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
