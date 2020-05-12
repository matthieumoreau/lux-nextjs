import { S3, Endpoint } from 'aws-sdk';
import logger from '../config/axios/interceptor';

import bellesDemeuresEndPoint from './bellesDemeuresEndPoint.datasources';
import imail from './imail.datasources';
import aws from './aws.datasources';

export default {
  bellesDemeuresEndPoint: new bellesDemeuresEndPoint({
    baseURL: process.env.BD_API_HOST,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.BD_API_KEY,
      Accept: 'application/json',
    },
    ...(process.env.NODE_ENV !== 'production'
      ? { interceptors: [logger] }
      : {}),
  }),
  imail: new imail({
    baseURL: process.env.IMAIL_HOST,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    ...(process.env.NODE_ENV !== 'production'
      ? { interceptors: [logger] }
      : {}),
  }),
  aws: new aws(
    new S3({
      endpoint: process.env.BUCKET_ENDPOINT,
      apiVersion: process.env.BUCKET_VERSION,
      region: process.env.BUCKET_REGION,
      accessKeyId: process.env.BUCKET_SK,
      secretAccessKey: process.env.BUCKET_AK,
    })
  ),
};
