const BaseRepository = require('./base');

/**
 * Product Types repository
 * @extends BaseRepository
 */
class ProductType extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'productTypes';
  }
}

module.exports = ProductType;
