import { AxiosDataSource } from '@ovotech/apollo-datasource-axios';
import { AxiosRequestConfig } from 'axios';

class imail extends AxiosDataSource {
  /**
   * GET OFFER
   */
  async send(data, config: AxiosRequestConfig) {
    return this.post(`/`, data, config);
  }
}

export default imail;
