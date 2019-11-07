const BaseRepository = require("./base");
/**
 * Products repository
 * @extends BaseRepository
 */
class Product extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "products";
  }

  /**
   * getParams
   * This function is disabled due to bug
   * https://github.com/commercetools/nodejs/issues/1065
   * @param {Object} query
   */
  // getParams(query) {
  //   const {
  //     priceCurrency,
  //     priceCountry,
  //     priceCustomerGroup,
  //     priceChannel
  //   } = query || {};

  //   return {
  //     ...super.getParams(query),
  //     ...(priceCurrency && { priceCurrency }),
  //     ...(priceCountry && { priceCountry }),
  //     ...(priceCustomerGroup && { priceCustomerGroup }),
  //     ...(priceChannel && { priceChannel })
  //   };
  // }

  /**
   * getQueryParams
   * This function is disabled due to bug
   * https://github.com/commercetools/nodejs/issues/1065
   * @param {Object} query
   */
  // getQueryParams(query) {
  //   const {
  //     priceCurrency,
  //     priceCountry,
  //     priceCustomerGroup,
  //     priceChannel
  //   } = query || {};

  //   return {
  //     ...super.getQueryParams(query),
  //     ...(priceCurrency && { priceCurrency }),
  //     ...(priceCountry && { priceCountry }),
  //     ...(priceCustomerGroup && { priceCustomerGroup }),
  //     ...(priceChannel && { priceChannel })
  //   };
  // }
}

module.exports = Product;
