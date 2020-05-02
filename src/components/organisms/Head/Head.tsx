import React from 'react';
import NextHead from 'next/head';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation } from '@i18n';
import { DefaultSeo } from '@components/molecules/Seo';

const Head = () => {
  const {
    state: { ctx, domain },
  } = useGlobalContext();
  return (
    <>
      <DefaultSeo
        title="default title"
        description="default desc"
        canonical={`${domain}${ctx.asPath}`}
        additionalMetaTags={[
          {
            property: 'msapplication-TileColor',
            content: 'Jane Doe',
          },
          {
            name: 'theme-color',
            content: 'NextSeo',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
        ]}
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
      <NextHead>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon-16x16.png"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <link
          rel="mask-icon"
          href="/static/safari-pinned-tab.svg"
          color="#0d2263"
        />
      </NextHead>
    </>
  );
};

export default Head;
