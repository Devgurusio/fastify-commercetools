const BaseRepository = require("./base");

/**
 * Payments repository
 * @extends BaseRepository
 */
class Payment extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "payments";
  }
}

module.exports = Payment;
