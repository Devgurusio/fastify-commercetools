const BaseRepository = require("./base");

/**
 * Shopping Lists repository
 * @extends BaseRepository
 */
class ShoppingList extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "shoppingLists";
  }
}

module.exports = ShoppingList;
