const BaseRepository = require('./base');

/**
 * Orders repository
 * @extends BaseRepository
 */
class Order extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'orders';
  }
}

module.exports = Order;
