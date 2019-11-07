const BaseRepository = require("./base");

/**
 * Inventory repository
 * @extends BaseRepository
 */
class Inventory extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "inventory";
  }
}

module.exports = Inventory;
