const BaseRepository = require('./base');

/**
 * Reviews repository
 * @extends BaseRepository
 */
class Review extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'reviews';
  }
}

module.exports = Review;
