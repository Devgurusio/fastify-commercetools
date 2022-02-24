const BaseRepository = require('./base');

/**
 * Shipping Methods repository
 * @extends BaseRepository
 */
class ShippingMethod extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'shippingMethods';
  }

  /**
   * Returns the query parameters
   * @protected
   * @param {Object} query
   * @param {string|string[]} query.where - array of where clauses
   * @param {string} query.whereOperator - where operator to join where clauses ("and" or "or")
   * @param {string|string[]} query.expand - array of {@link https://docs.commercetools.com/http-api.html#reference-expansion|Reference Expansion}
   * @param {string} query.page - page to return
   * @param {string} query.perPage - max resources per page
   * @param {Object[]} query.sort - sort clauses
   * @param {string} query.sort.by - field to sort by
   * @param {string} query.sort.direction - sort direction ("asc" or "desc")
   * @param {string} query.sortBy - Deprecated: field to sort by
   * @param {string} query.sortDirection - Deprecated: sort direction ("asc" or "desc")
   * @param {string} query.cartId - retrieves all the shipping methods that can ship to the shipping address of the given cart {@link https://docs.commercetools.com/http-api-projects-shippingMethods#get-shippingmethods-for-a-cart}
   * @param {string} query.country - retrieves all the shipping methods that can ship to the country. A two-digit country code as per {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2|ISO 3166-1 alpha-2}
   * @param {string} query.state - Optional: retrieves all the shipping methods that can ship to the state (has to be used in conjuntion with country)
   * @param {string} query.currency - Optional: retrieves all the shipping methods that has value for this currency (has to be used in conjuntion with country). The currency code compliant to {@link https://en.wikipedia.org/wiki/ISO_4217|ISO 4217}
   */
  getQueryParams(query) {
    const { cartId, country, state, currency } = query || {};
    return {
      ...super.getQueryParams(query),
      ...(cartId && { cartId }),
      ...(country && { country }),
      ...(state && { state }),
      ...(currency && { currency })
    };
  }
}

module.exports = ShippingMethod;
