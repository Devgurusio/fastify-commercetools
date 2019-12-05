const BaseRepository = require("./base");
const { features } = require("@commercetools/api-request-builder");

/**
 * Store repository
 * @extends BaseRepository
 */
class Store extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "stores";
  }

  static get customService() {
    return {
      stores: {
        type: "stores",
        endpoint: "/stores",
        features: [
          features.create,
          features.update,
          features.del,
          features.query,
          features.queryOne,
          features.queryExpand
        ]
      }
    };
  }
}

module.exports = Store;
