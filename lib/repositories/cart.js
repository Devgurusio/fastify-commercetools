const BaseRepository = require("./base");

/**
 * Carts repository
 * @extends BaseRepository
 */
class Cart extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "carts";
  }
}

module.exports = Cart;
