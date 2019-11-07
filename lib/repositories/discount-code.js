const BaseRepository = require("./base");

/**
 * Discount Codes repository
 * @extends BaseRepository
 */
class DiscountCode extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "discountCodes";
  }
}

module.exports = DiscountCode;
