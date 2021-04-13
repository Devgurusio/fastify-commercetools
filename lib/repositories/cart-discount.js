const BaseRepository = require('./base');

/**
 * Cart Discounts repository
 * @extends BaseRepository
 */
class CartDiscount extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'cartDiscounts';
  }
}

module.exports = CartDiscount;
