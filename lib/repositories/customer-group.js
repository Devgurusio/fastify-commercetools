const BaseRepository = require("./base");

/**
 * Customer Groups repository
 * @extends BaseRepository
 */
class CustomerGroup extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "customerGroups";
  }
}

module.exports = CustomerGroup;
