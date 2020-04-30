import Head from 'next/head';
import { NextSeo, CorporateContactJsonLd, LocalBusinessJsonLd } from 'next-seo';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation } from '@i18n';
import seoManager from '@utils/seoManager';
import JsonLd from './JsonLd';

const PageSeo = ({ title, description, jsonLd = [] }) => {
  const {
    state: { ctx, domain, urls },
  } = useGlobalContext();
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${domain}${ctx.asPath}`}
        languageAlternates={seoManager.getlanguageAlternates(domain, urls)}
      />

      <JsonLd data={jsonLd} />
    </>
  );
};

export default PageSeo;
