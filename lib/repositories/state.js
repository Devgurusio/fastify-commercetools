const BaseRepository = require("./base");

/**
 * States repository
 * @extends BaseRepository
 */
class State extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "states";
  }
}

module.exports = State;
