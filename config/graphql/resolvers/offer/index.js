import SwaggerMapper from '../../../../server/mappers/swagger';
import swaggerDataMapping from './offer.mapping';

export default async (_source, { id }, { dataSources }) => {
  const data = await dataSources.bellesDemeuresEndPoint.getOffer(id);

  const mapper = new SwaggerMapper(swaggerDataMapping);
  let offer = mapper.map(data.data);

  const getOfferVisual = (offerId, visualId) => {
    const offerDirectory = offerId.substr(0, 3);
    const visualDirectory = visualId.substr(0, 1);
    return `${process.env.MMF_API_HOST}/ads/photo-prop-800x600/${offerDirectory}/${visualDirectory}/${visualId}.jpg`.toLowerCase();
  };

  const getAgencyLogo = (agencyId, logoId) => {
    const agcDirectory =
      agencyId !== undefined ? agencyId.substr(0, 3) : 'undef';
    return logoId !== null
      ? `${process.env.MMF_API_HOST}/agc/${agcDirectory}/${agencyId}/logo/160x110/${logoId}`.toLowerCase()
      : null;
  };

  offer.Photos.map(async Photo => {
    Photo.Url = getOfferVisual(offer.AdId, Photo.Id);
  });

  offer.Agency.logoUrl = getAgencyLogo(
    offer.Agency.AgencyId,
    offer.Agency.Logo
  );

  offer.Agency.siren ? offer.Agency.Siren.substr(0, 9) : offer.Agency.Siren;

  return offer;
};
