const BaseRepository = require("./base");

/**
 * Product Discounts repository
 * @extends BaseRepository
 */
class ProductDiscount extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "productDiscounts";
  }
}

module.exports = ProductDiscount;
