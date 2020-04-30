import Head from 'next/head';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation } from '@i18n';
import seoManager from '@utils/seoManager';
import JsonLd from './JsonLd';

const DefaultSeo = ({ title, description, jsonLd }) => {
  const {
    state: { ctx, domain, urls },
  } = useGlobalContext();
  const { t } = useTranslation();

  return (
    <>
      <NextDefaultSeo
        title={title}
        description={description}
        canonical={`${domain}${ctx.asPath}`}
      />

      <JsonLd data={jsonLd} />
    </>
  );
};

export default DefaultSeo;
