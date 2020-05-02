import React from 'react';
import Head from 'next/head';
import seoManager from '@utils/seoManager';
import { DefaultSeoProps } from '@interfaces/head';

const DefaultSeo = ({
  title,
  titleTemplate,
  dangerouslySetAllPagesToNoIndex = false,
  dangerouslySetAllPagesToNoFollow = false,
  description,
  canonical,
  facebook,
  openGraph,
  additionalMetaTags,
  twitter,
  defaultOpenGraphImageWidth,
  defaultOpenGraphImageHeight,
  defaultOpenGraphVideoWidth,
  defaultOpenGraphVideoHeight,
  mobileAlternate,
  languageAlternates,
  jsonLd,
}: DefaultSeoProps) => {
  return (
    <Head>
      {seoManager.buildTags({
        title,
        titleTemplate,
        dangerouslySetAllPagesToNoIndex,
        dangerouslySetAllPagesToNoFollow,
        description,
        canonical,
        facebook,
        openGraph,
        additionalMetaTags,
        twitter,
        defaultOpenGraphImageWidth,
        defaultOpenGraphImageHeight,
        defaultOpenGraphVideoWidth,
        defaultOpenGraphVideoHeight,
        mobileAlternate,
        languageAlternates,
      })}

      {seoManager.buildJsonLd(jsonLd)}
    </Head>
  );
};

export default DefaultSeo;
