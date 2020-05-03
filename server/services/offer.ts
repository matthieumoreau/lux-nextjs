export const getOfferVisual = offer => {
  const offerId = offer.AdId;
  offer.Photos.map(async Photo => {
    const visualId = Photo.Id;
    const offerDirectory = offerId.substr(0, 3);
    const visualDirectory = visualId.substr(0, 1);
    Photo.Url = `${process.env.MMF_API_HOST}/ads/photo-prop-800x600/${offerDirectory}/${visualDirectory}/${visualId}.jpg`.toLowerCase();
  });
  return offer;
};
