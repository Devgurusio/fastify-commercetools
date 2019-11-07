const BaseRepository = require("./base");

/**
 * Channels repository
 * @extends BaseRepository
 */
class Channel extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "channels";
  }
}

module.exports = Channel;
