import Head from 'next/head';
import {
  DefaultSeo as NextDefaultSeo,
  CorporateContactJsonLd,
  LocalBusinessJsonLd,
} from 'next-seo';
import { useGlobalContext } from '@store/GlobalContext';
import { useTranslation } from '@i18n';
import seoManager from '@utils/seoManager';

const DefaultSeo = ({ title, description }) => {
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

      <LocalBusinessJsonLd
        type="Organization"
        id={domain}
        name="Lux-residence"
        address={{
          streetAddress: '65 rue Ordener',
          addressLocality: 'Paris, France',
          addressRegion: '',
          postalCode: 'F-75018',
          addressCountry: 'FR',
        }}
        description=""
        images={[]}
      />

      <CorporateContactJsonLd
        url={`${domain}${ctx.asPath}`}
        logo="http://www.example.com/logo.png"
        contactPoint={[
          {
            telephone: '33-1-53-38-80-00',
            contactType: 'customer support',
            contactOption: "Coût d'un appel local",
            areaServed: 'FR',
          },
        ]}
      />
    </>
  );
};

export default DefaultSeo;
