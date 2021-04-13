const BaseRepository = require('./base');

/**
 * Messages repository
 * @extends BaseRepository
 */
class Message extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'messages';
  }

  /**
   * @throws Method Not Allowed
   */
  async create() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "Messages doesn't allow CREATE"
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
        message: "Messages doesn't allow UPDATE"
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
        message: "Messages doesn't allow DELETE"
      }
    };

    throw error;
  }
}

module.exports = Message;
