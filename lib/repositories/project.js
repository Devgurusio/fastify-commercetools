const BaseRepository = require('./base');

/**
 * Project repository
 * @extends BaseRepository
 */
class Project extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'project';
  }

  /**
   * @throws Method Not Allowed
   */
  async create() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "Project doesn't allow CREATE"
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
        message: "Project doesn't allow DELETE"
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
        message: "Project doesn't allow FIND"
      }
    };

    throw error;
  }
}

module.exports = Project;
