import bellesDemeuresEndPoint from './bellesDemeuresEndPoint.datasources';

export default {
  bellesDemeuresEndPoint: new bellesDemeuresEndPoint({
    baseURL: process.env.BD_API_HOST,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.BD_API_KEY,
      Accept: 'application/json',
    },
  }),
};
