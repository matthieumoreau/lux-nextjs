import SwaggerMapper from './../../mappers/swagger';
import swaggerDataMapping from './offer.mapping.json';

import { getOfferVisual } from './../../services/offer';
import { getAgencyLogo, getAgencySiren } from './../../services/agency';
import { translateLocality } from './../../services/locality';
import { translateElementFromDictionary } from './../../services/common';

import {
  transactionTypeDictionary,
  propertyTypeDictionary,
  heatingTypeDictionary,
  heatingKindDictionary,
} from './../../../config/dictionnary/offer';

export default async (_source, { id }, { dataSources }) => {
  const data = await dataSources.bellesDemeuresEndPoint.getOffer(id);

  const mapper = new SwaggerMapper(swaggerDataMapping);
  let offer: any = mapper.map(data.data);

  if (offer.PropertyType) {
    offer.PropertyType = translateElementFromDictionary(
      offer.PropertyType,
      propertyTypeDictionary
    );
  }

  if (offer.TransactionType) {
    offer.TransactionType = translateElementFromDictionary(
      offer.TransactionType,
      transactionTypeDictionary
    );
  }

  if (offer.Properties.HeatingKind) {
    offer.Properties.HeatingKind = translateElementFromDictionary(
      offer.Properties.HeatingKind,
      heatingKindDictionary
    );
  }

  if (offer.Properties.HeatingType) {
    offer.Properties.HeatingType = translateElementFromDictionary(
      offer.Properties.HeatingType,
      heatingTypeDictionary
    );
  }

  if (offer.Address) {
    translateLocality(offer.Address);
  }

  if (offer.Photos) {
    getOfferVisual(offer);
  }

  if (offer.Agency && offer.Agency.Logo) {
    getAgencyLogo(offer.Agency);
  }

  if (offer.Agency) {
    getAgencySiren(offer.Agency);
  }

  return offer;
};
