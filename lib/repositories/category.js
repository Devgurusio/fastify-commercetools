const BaseRepository = require("./base");

/**
 * Categories repository
 * @extends BaseRepository
 */
class Category extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "categories";
  }
}

module.exports = Category;
