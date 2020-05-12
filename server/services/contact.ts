import md5 from 'md5';

export const site = 'LRFR';

export const actions = {
  create: 'CREATION',
  read: 'GET',
  delete: 'DELETE',
};

export const campaign = {
  default: 'CONTAGWEBAD1',
  copy: 'COPYCONTAGWEBAD1',
  newsletter: 'NEWSGRANDCOMPTE1',
  duplicate: 'DUPLICATE_SENDOFFER',
};

export const setupParams = (data, offer) => {
  let date = new Date();
  const dayDate = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const userMail = data.email.toLowerCase();

  let agencyMailParam = {
    AGENCENAME: offer.Agency.Name,
    EMAIL: offer.Agency.Email,
    AGENCECITY: offer.Agency.Address.Locality2.name,
    AGENCEPOSTCODE: offer.Agency.ZipCode,
    AGENCEID: offer.Agency.AgencyId,
    IDPRESTO: offer.Agency.IdPresto,

    URLIMAGE: offer.Photos[0].url, // url vers l"image de l"annonce
    CONTENT10: data.message,
    CONTENT20: data.message,
    CONTENT30: offer.AdRef,
    CONTENT41: dayDate,
    CONTENT51: `${date.getFullYear()}`,
    CONTENT42: md5(offer.Agency.Email.toLowerCase()),
    SOURCE: data.location,

    ADCONTENT: offer.Description.fr,
    IDREFANNONCE: offer.AdId,
    //   @TODO change this URL TO: /:lang/:transaction/:propType/:region/:departmentZip/:town/:offerId
    URLRESULT: data.location + '?rest=1',
    ADPRICE: offer.Price.Raw,

    USERFIRSTNAME: data.firstname,
    USERLASTNAME: data.lastname,
    USERMESSAGE: data.message,
    USERPHONE: data.phone,
    SENDER: userMail,
    ADTRANSACTION: data.TransactionTypeId,
  };
  let userCopyParams = {
    // LOREM IPSUM DATA
    CONTENT103: offer.Description.fr,
    CONTENT203: offer.Description.fr,
    // LOREM IPSUM END
    CONTENT41: dayDate,
    CONTENT51: `${date.getFullYear()}`,
    CONTENT42: md5(userMail),
    EMAIL: userMail,
    KEYWORDS: false,
    ADTRANSACTION: data.TransactionTypeId,
  };

  return {
    agencyMailParam,
    userCopyParams,
  };
};

export const _prepareParams = inputParams => {
  // check for mandatory parameters
  if (inputParams.length === 0) {
    console.debug({
      ERROR_CODE: 'CLI_ERR_PARAMS_INVALID',
      MESSAGE: 'Params parameter should not be an empty array !',
      STATUS: 'ERR',
    });
    return false;
  }

  let outputParams = {};
  // All keys in uppercase
  for (let property in inputParams) {
    if (Object.prototype.hasOwnProperty.call(inputParams, property)) {
      outputParams[property.toUpperCase()] = inputParams[property];
    }
  }

  return outputParams;
};

export const _templateParams = (site, lang, subscription, action) => {
  return {
    site: site,
    lang: lang.toUpperCase(),
    subscription: subscription,
    action: action,
  };
};
