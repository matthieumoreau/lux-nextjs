import { Interceptor } from '@ovotech/apollo-datasource-axios';

const logger: Interceptor = {
  response: {
    onFulfilled: res => {
      // console.log(res);
      return res;
    },
    onRejected: err => {
      // console.log(err);
      return err;
    },
  },
  request: {
    onFulfilled: req => {
      // console.log(req);
      return req;
    },
    onRejected: err => {
      // console.log(err);
      return err;
    },
  },
};

export default logger;
