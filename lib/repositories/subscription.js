const BaseRepository = require('./base');

/**
 * Subscriptions repository
 * @extends BaseRepository
 */
class Subscriptions extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'subscriptions';
  }
}

module.exports = Subscriptions;
