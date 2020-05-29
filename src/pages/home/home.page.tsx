import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useTranslation } from '@i18n';
import styled from 'styled-components';

import { useGlobalContext } from '@store/GlobalContext';
import urlManager from '@utils/urlManager';
import seoManager from '@utils/seoManager';

import Link from '@components/atoms/Link/Link';
import { PageSeo } from '@components/molecules/Seo';

import './home.styles.less';

interface Props {
  ctx: any;
}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const offer = {
  offerId: '2642937C-F6F0-C424-D1DC-F9F8297BAEF3',
  refId: '150_3179',
  propertyType: {
    id: 2,
    label: 'Maison',
    trackingLabel: 'maison',
    translationKey: 'propertyType.house',
  },
  transactionType: {
    id: 6,
    label: 'Vente',
    trackingLabel: 'Vente',
    trackingId: '1',
    trackingLevel2: '9',
    translationKey: 'transactionType.sale',
  },
  description: {
    fr:
      "Acquisition immobilière de cette villa de type F4 sur le territoire de Cassis. La proximité avec Aubagne, située à 15 km, est un atout. L'agence immobilière AGENCE SIGA LA CIOTAT se tient à votre disposition si vous souhaitez organiser une visite de cette maison. L'intérieur offre 162m2 et se compose d'un coin salon de 50m2, une salle de bain, 3 chambres et un espace cuisine. La tranquillité des occupants est assurée par le double vitrage. Le terrain de 1443m2 se transforme facilement en aire de jeux pour vos enfants. L'habitation s'accompagne d'une aire de parking privative et un garage. Prix : 870 000 €. Pour ce qui est de l'impôt foncier, le montant est de 1 800 euros sur l'année. Mandat no 3179 DPE B Lot 5 Taxe foncière 1800 € Consultez nos annonces et plus encore sur http://annonces-immobilieres-marseille.siga.fr/ Réf. annonce : 150_3179",
    en:
      'Real estate acquisition of this F4 villa in the territory of Cassis. The proximity to Aubagne, located 15 km away, is an asset. The real estate agency AGENCE SIGA LA CIOTAT is available if you wish to organise a tour of this house. The interior offers 162sqm and consists of a 50m2 seating area, a bathroom, 3 bedrooms and a kitchen area. The tranquillity of the occupants is ensured by the double glazing. The 1443m2 field is easily transformed into a playground for your children. The house is accompanied by a private parking area and a garage. Price: $870,000. In terms of property tax, the amount is 1,800 euros over the year. Warrant No. 3179 DPE B Lot 5 Property Tax 1800 - Check out our ads and more on http://annonces-immobilieres-marseille.siga.fr/ Ref. announcement: 150-3179',
    nl:
      'Real estate acquisition of this F4 villa in the territory of Cassis. The proximity to Aubagne, located 15 km away, is an asset. The real estate agency AGENCE SIGA LA CIOTAT is available if you wish to organise a tour of this house. The interior offers 162sqm and consists of a 50m2 seating area, a bathroom, 3 bedrooms and a kitchen area. The tranquillity of the occupants is ensured by the double glazing. The 1443m2 field is easily transformed into a playground for your children. The house is accompanied by a private parking area and a garage. Price: $870,000. In terms of property tax, the amount is 1,800 euros over the year. Warrant No. 3179 DPE B Lot 5 Property Tax 1800 - Check out our ads and more on http://annonces-immobilieres-marseille.siga.fr/ Ref. announcement: 150-3179',
    de:
      'Real estate acquisition of this F4 villa in the territory of Cassis. The proximity to Aubagne, located 15 km away, is an asset. The real estate agency AGENCE SIGA LA CIOTAT is available if you wish to organise a tour of this house. The interior offers 162sqm and consists of a 50m2 seating area, a bathroom, 3 bedrooms and a kitchen area. The tranquillity of the occupants is ensured by the double glazing. The 1443m2 field is easily transformed into a playground for your children. The house is accompanied by a private parking area and a garage. Price: $870,000. In terms of property tax, the amount is 1,800 euros over the year. Warrant No. 3179 DPE B Lot 5 Property Tax 1800 - Check out our ads and more on http://annonces-immobilieres-marseille.siga.fr/ Ref. announcement: 150-3179',
  },
  photos: [
    {
      order: 1,
      type: 'Photo',
      url:
        'https://mmf.lux-residence.com/mmf/ads/photo-prop-800x600/264/4/4cc18820-8ef4-41d6-b395-135b010d1f2b.jpg',
    },
    {
      order: 2,
      type: 'Photo',
      url:
        'https://mmf.lux-residence.com/mmf/ads/photo-prop-800x600/264/0/04a0f0cf-b083-4fb0-a3be-124ae823d837.jpg',
    },
    {
      order: 3,
      type: 'Photo',
      url:
        'https://mmf.lux-residence.com/mmf/ads/photo-prop-800x600/264/5/525ac5a9-f2bd-477d-8426-a7fc72d83e98.jpg',
    },
    {
      order: 4,
      type: 'Photo',
      url:
        'https://mmf.lux-residence.com/mmf/ads/photo-prop-800x600/264/e/ee687df1-ce9b-42e1-821e-0250d8495017.jpg',
    },
  ],
  price: {
    raw: 870000,
  },
  properties: {
    buildYear: 0,
    fees: null,
    floor: null,
    hasAirConditioned: false,
    isTiledFloor: 0,
    hasAlarm: false,
    hasBasement: false,
    hasCableTv: null,
    hasCaretaker: null,
    hasCellar: false,
    hasChimney: false,
    hasCondominiumSyndicate: null,
    hasEntryCode: null,
    hasHandicapAccessibility: false,
    hasIntercom: null,
    hasLift: false,
    hasParquet: false,
    hasPool: true,
    hasSyndicatProcedure: false,
    isHighlighed: false,
    isBuildable: null,
    isCalm: false,
    isDuplex: false,
    isFurnished: false,
    isIsmh: false,
    isRenovated: false,
    isRecent: false,
    isToRenovate: false,
    environmentId: null,
    heatingKind: {
      id: 1,
      translationKey: null,
    },
    heatingType: {
      id: 3,
      translationKey: null,
    },
    kitchenTypeId: 1,
    nbrBathRoom: 1,
    nbrBedroom: 3,
    nbrBoxes: 1,
    nbrParking: 0,
    nbrRoom: 4,
    nbrShowerRoom: 0,
    nbrToilets: null,
    nbrTennisFields: 0,
    area: 162,
    plotArea: 1443,
    livingRoomArea: null,
    livingArea: 162,
    syndicatProcedureDescription: null,
    hasTennisField: false,
    isSunny: false,
    exposure: null,
    isHighlighted: null,
    typeYatch: null,
    nbrPassengers: 0,
    size: null,
  },
  locality: {
    locality0: {
      name: "PROVENCE ALPES COTE D'AZUR",
      names: {
        fr: "PROVENCE ALPES COTE D'AZUR",
        en: "PROVENCE ALPES COTE D'AZUR",
        it: "PROVENCE ALPES COTE D'AZUR",
        de: "PROVENCE ALPES COTE D'AZUR",
        nl: "PROVENCE ALPES COTE D'AZUR",
        ru: 'Прованс Альпы Лазурный Берег',
      },
    },
    locality1: {
      name: 'BOUCHES DU RHONE',
      names: {
        fr: 'BOUCHES DU RHONE',
        en: 'BOUCHES DU RHONE',
        it: 'BOUCHES DU RHONE',
        de: 'BOUCHES DU RHONE',
        nl: 'BOUCHES DU RHONE',
        ru: 'Буш-Дю-Рон',
      },
    },
    locality2: {
      name: 'CASSIS',
      names: {
        fr: 'CASSIS',
        en: 'CASSIS',
        it: 'CASSIS',
        de: 'CASSIS',
        nl: 'CASSIS',
        ru: 'Кассис',
      },
      zip: 13260,
    },
  },
};

const Page: NextPage<Props> = ({ ctx }) => {
  const {
    state: { currentLocale, device, domain },
    dispatch,
  } = useGlobalContext();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch({
      type: 'SET_URLS',
      payload: urlManager.getPageUrls(ctx),
    });
  }, [ctx]);

  return (
    <>
      <PageSeo
        title="Homepage Lux"
        description="Homepage description"
        languageAlternates={seoManager.getlanguageAlternates(
          domain,
          urlManager.getPageUrls(ctx)
        )}
      />
      <Title>{t('hello')} - Homepage with styled-component!</Title>
      <div className="title">{t('hello')} - Homepage with Less style!</div>
      <main>Your current locale: {currentLocale}</main>
      <main>Your device: {device}</main>
      <div>
        <Link href="/offer/offer" data={offer}>
          Annonce
        </Link>
      </div>
      <div>
        <Link href="https://www.google.fr/">Google</Link>
      </div>
      <div>
        <Link href="/it">
          BAD FORMAT INTERNAL LINK BUT SP WORKS (AUTO PATHNAME RESOLVER) ! -
          Homepage IT
        </Link>
      </div>
      <div>
        <Link href="/pt">
          BAD FORMAT INTERNAL LINK BUT SP NOT WORKS ! - Homepage PT --> 404
        </Link>
      </div>
      {/* <div>
        <Link href="/en/sale/property/PROVENCE-ALPES-COTE-D'AZUR/13/CASSIS/2642937C-F6F0-C424-D1DC-F9F8297BAEF3">
          BAD FORMAT INTERNAL LINK BUT SP WORKS (AUTO PATHNAME RESOLVER) ! -
          OFFER EN
        </Link>
      </div> */}
      <div>
        <Link href="/en/sale/lol/PROVENCE-ALPES-COTE-D'AZUR/13/CASSIS/2642937C-F6F0-C424-D1DC-F9F8297BAEF3">
          BAD FORMAT INTERNAL LINK BUT SP NOT WORKS ! - OFFER EN--> 404
        </Link>
      </div>
    </>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  return {
    ctx: {
      pathname: ctx.pathname,
      asPath: ctx.asPath,
      query: ctx.query,
    },
    namespacesRequired: ['common'],
  };
};

export default Page;
