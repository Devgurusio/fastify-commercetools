const BaseRepository = require("./base");

/**
 * My Carts repository
 * @extends BaseRepository
 */
class MyCart extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "myCarts";
  }
}

module.exports = MyCart;
