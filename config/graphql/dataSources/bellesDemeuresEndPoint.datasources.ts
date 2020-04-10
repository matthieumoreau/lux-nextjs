import { AxiosDataSource } from '@ovotech/apollo-datasource-axios';

class bellesDemeuresEndPoint extends AxiosDataSource {
  /**
   * GET OFFER
   */
  async getOffer(id) {
    return this.get(`/lr/annonce/get?idAnnonce=${id}`);
  }
}

export default bellesDemeuresEndPoint;
