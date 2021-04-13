const BaseRepository = require('./base');

/**
 * Zones repository
 * @extends BaseRepository
 */
class Zone extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'zones';
  }
}

module.exports = Zone;
