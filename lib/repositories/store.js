const BaseRepository = require('./base');
const { features } = require('@commercetools/api-request-builder');

/**
 * Store repository
 * @extends BaseRepository
 */
class Store extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'stores';
  }

  static get customService() {
    return {
      stores: {
        type: 'stores',
        endpoint: '/stores',
        features: [
          features.create,
          features.update,
          features.del,
          features.query,
          features.queryOne,
          features.queryExpand
        ]
      }
    };
  }

  /**
   * Returns the requestCustomBuilder service that corresponds to this repository
   * @protected
   * @param {string} key - store Key
   * @returns {string} - Url to perform action on in-stores
   */
  requestCustomBuilder(key) {
    return `/${this.connection.projectKey}/in-store/key=${key}/carts`;
  }

  /**
   * Gets all carts/orders in specific store
   * @param {string} key - store Key
   * @returns {Object} - All carts/orders in specific store
   */
  async getCarts(key) {
    const response = await this.connection.execute({
      uri: this.requestCustomBuilder(key),
      method: 'GET'
    });
    return response.body;
  }
}

module.exports = Store;
