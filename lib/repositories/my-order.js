const BaseRepository = require('./base');

/**
 * My Orders repository
 * @extends BaseRepository
 */
class MyOrder extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'myOrders';
  }

  /**
   * @throws Method Not Allowed
   */
  async update() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "My Orders doesn't allow UPDATE"
      }
    };

    throw error;
  }

  /**
   * @throws Method Not Allowed
   */
  async delete() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "My Orders doesn't allow DELETE"
      }
    };

    throw error;
  }
}

module.exports = MyOrder;
