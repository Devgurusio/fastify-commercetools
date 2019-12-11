const BaseRepository = require("./base");

/**
 * Custom objects repository
 * @extends BaseRepository
 */
class CustomObject extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "customObjects";
  }

  /**
   * Wrapper to create function as custom objects has no update actions
   * {@link https://docs.commercetools.com/http-api-projects-custom-objects#create-or-update-a-customobject}
   * @param {Object} resource - updated resource
   * @returns {Object} - the updated resource
   */
  async update(resource) {
    return this.create(resource);
  }

  /**
   * Deletes the resource by container and key
   * @param {string} container - customObject container
   * @param {number} key - resource key
   * @returns {Object} - the deleted resource
   */
  async deleteByContainerAndKey(container, key) {
    const response = await this.connection.execute({
      uri: `/${this.connection.projectKey}/custom-objects/${container}/${key}`,
      method: "DELETE"
    });
    return response.body;
  }
}

module.exports = CustomObject;
