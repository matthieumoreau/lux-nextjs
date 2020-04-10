class SwaggerMapper {
  swaggerMapStage: JSON;
  /**
   * Used to initialise the mapping class
   *
   * @param map
   */
  constructor(map: JSON) {
    this.swaggerMapStage = map;
  }

  /**
   * Used to extract the values from the API response data and return a new object usable by Lux residence
   *
   * @param data
   * @returns {*}
   */
  map(data) {
    return this.recursiveSwaggerMapping(data, data, this.swaggerMapStage);
  }

  /**
   * Used to extract the values from the API response data and return a new object usable by Lux residence
   *
   * @param data
   * @param dataStage
   * @param swaggerMapStage
   *
   * @returns {*}
   */
  recursiveSwaggerMapping(data, dataStage, swaggerMapStage) {
    let newData = {};

    if (dataStage !== null) {
      for (let key in swaggerMapStage) {
        // We test if the key is needed/used
        if (key !== undefined && swaggerMapStage[key] !== null) {
          switch (typeof swaggerMapStage[key]) {
            case 'object':
              if (key === 'Photos') {
                newData[key] = this.recursiveSwaggerMappingForPhotos(
                  data,
                  dataStage[swaggerMapStage[key].key],
                  swaggerMapStage[key].data
                );
              } else {
                switch ('object') {
                  case typeof swaggerMapStage[key].dataKeys:
                    newData[key] = this.fromData(
                      data,
                      swaggerMapStage[key].dataKeys
                    );
                    break;
                  case typeof swaggerMapStage[key].arrayKeys:
                    newData[key] = this.fromArray(
                      data,
                      swaggerMapStage[key].arrayKeys
                    );
                    break;
                  default:
                    newData[key] = this.recursiveSwaggerMapping(
                      data,
                      dataStage[swaggerMapStage[key].key],
                      swaggerMapStage[key].data
                    );
                    break;
                }
              }
              break;

            default:
              newData[key] = dataStage[swaggerMapStage[key]];
          }
        }
      }
    } else {
      return null;
    }

    return newData;
  }

  /**
   * Used to extract the value from "Data" part of the API response data
   *
   * @param data
   * @param swaggerMapStage
   * @returns {any}
   */
  fromData(data, swaggerMapStage) {
    return this.fromArray(data['Data'], swaggerMapStage);
  }

  /**
   * Used to extract the value from "Data" part of the API response data
   *
   * @param data
   * @param swaggerMapStage
   * @returns {any}
   */
  fromArray(data, swaggerMapStage) {
    let dataStage = Object.assign({}, data);

    for (let key in swaggerMapStage) {
      dataStage = dataStage[swaggerMapStage[key]];
    }

    return dataStage;
  }

  /**
   * Used to fetch all the Photos from the API response data
   *
   * @param data
   * @param dataStage
   * @param swaggerMapStage
   * @returns {Array}
   */
  recursiveSwaggerMappingForPhotos(data, dataStage, swaggerMapStage) {
    let newData = [];

    dataStage.forEach((element, index, tab) => {
      newData[index] = this.recursiveSwaggerMapping(
        data,
        element,
        swaggerMapStage
      );
    });

    return newData;
  }
}

export default SwaggerMapper;
