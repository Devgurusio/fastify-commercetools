const BaseRepository = require("./base");

/**
 * Types repository
 * @extends BaseRepository
 */
class Type extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "types";
  }
}

module.exports = Type;
