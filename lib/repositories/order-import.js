const BaseRepository = require("./base");

/**
 * Order Import repository
 * @extends BaseRepository
 */
class OrderImport extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "orderImport";
  }

  /**
   * @throws Method Not Allowed
   */
  async get() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "Order Import doesn't allow GET"
      }
    };

    throw error;
  }

  /**
   * @throws Method Not Allowed
   */
  async update() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "Order Import doesn't allow UPDATE"
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
        message: "Order Import doesn't allow DELETE"
      }
    };

    throw error;
  }

  /**
   * @throws Method Not Allowed
   */
  async find() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "Order Import doesn't allow FIND"
      }
    };

    throw error;
  }
}

module.exports = OrderImport;
