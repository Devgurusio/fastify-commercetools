const BaseRepository = require('./base');

/**
 * Extensions repository
 * @extends BaseRepository
 */
class Extension extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'extensions';
  }
}

module.exports = Extension;
