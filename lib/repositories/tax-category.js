const BaseRepository = require("./base");

/**
 * Tax Categories repository
 * @extends BaseRepository
 */
class TaxCategory extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "taxCategories";
  }
}

module.exports = TaxCategory;
