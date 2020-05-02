import React from 'react';
import { useGlobalContext } from '@store/GlobalContext';
import seoManager from '@utils/seoManager';
import { PageSeoProps } from '@interfaces/head';
import Head from 'next/head';

const PageSeo = ({
  title,
  noindex = false,
  nofollow,
  description,
  canonical,
  openGraph,
  facebook,
  twitter,
  additionalMetaTags,
  titleTemplate,
  mobileAlternate,
  languageAlternates,
  jsonLd = [],
}: PageSeoProps) => {
  const {
    state: { ctx, domain, urls },
  } = useGlobalContext();
  return (
    <Head>
      {seoManager.buildTags({
        title,
        noindex,
        nofollow,
        description,
        canonical,
        facebook,
        openGraph,
        additionalMetaTags,
        twitter,
        titleTemplate,
        mobileAlternate,
        languageAlternates: languageAlternates,
      })}
      {seoManager.buildJsonLd(jsonLd, 'page')}
    </Head>
  );
};

export default PageSeo;
