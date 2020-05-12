import { AxiosDataSource } from '@ovotech/apollo-datasource-axios';
import { AxiosRequestConfig } from 'axios';

class bellesDemeuresEndPoint extends AxiosDataSource {
  /**
   * GET OFFER
   */
  async getOffer(id: String, config?: AxiosRequestConfig) {
    return this.get(`/lr/annonce/get?idAnnonce=${id}`, config);
  }
}

export default bellesDemeuresEndPoint;
