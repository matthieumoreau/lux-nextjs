import { stringify } from 'querystring';
import { ApolloError } from 'apollo-server-express';
import { Interceptor } from '@ovotech/apollo-datasource-axios';

import SwaggerMapper from './../../mappers/swagger';
import swaggerDataMapping from './../offer/offer.mapping.json';

import {
  site,
  actions,
  campaign,
  setupParams,
  _prepareParams,
  _templateParams,
} from '../../services/contact';

export default async (_source, { input }, { dataSources }) => {
  const date = new Date();
  const fileName = `imail_${date.getFullYear()}${(
    '0' +
    (date.getMonth() + 1)
  ).slice(-2)}`;

  const customLogger = (
    context,
    status,
    swagger = false,
    offerId = input.offerId
  ): Interceptor => ({
    response: {
      onFulfilled: res => {
        return res;
      },
      onRejected: err => {
        // LOG AWS
        const text = `-------------------------------------------------
                    date: ${date.toDateString()} ${date.toTimeString()}
                    context: ${context}
                    status: ${status}
                    errno: ${err.errno}
                    offer: ${offerId}
                    returnedText: ${err}
                    -------------------------------------------------`;
        console.error(text);
        dataSources.aws.uploadFile(
          `${fileName}.err${swagger ? '.swagger' : ''}.log`,
          text
        );
        return err;
      },
    },
    request: {
      onFulfilled: req => {
        return req;
      },
      onRejected: err => {
        return err;
      },
    },
  });

  const execute = (lang, subscription, action, context, params) => {
    let parameters = _templateParams(
      site,
      lang.toUpperCase(),
      subscription,
      action
    );
    parameters['params'] = _prepareParams(params);

    return dataSources.imail.send(
      stringify(parameters).replace(
        'params=',
        'params=' + JSON.stringify(parameters['params'])
      ),
      {
        interceptors: [customLogger(context, 504)],
      }
    );
  };

  const request_offer = await dataSources.bellesDemeuresEndPoint.getOffer(
    input.offerId,
    {
      interceptors: [customLogger('IMail-getOffer', '404', true)],
    }
  );

  if (!request_offer) {
    throw new ApolloError(
      'Unable to retrieve offer information in french',
      'CONTACT_ERR_RETRIEVEOFFER',
      {
        offer: input.offerId,
      }
    );
  }

  const mapper = new SwaggerMapper(swaggerDataMapping);
  const offer: any = mapper.map(request_offer.data);

  const { agencyMailParam, userCopyParams } = setupParams(input, offer);

  const request_send = await execute(
    'fr',
    campaign.default,
    actions.create,
    'IMail-Send',
    agencyMailParam
  );

  const request_copy = await execute(
    input.lang,
    campaign.copy,
    actions.create,
    'IMail-Copy',
    userCopyParams
  );

  return {
    success: true,
    message: 'sent message',
    send: request_send.data,
    copy: request_copy.data,
  };
};
