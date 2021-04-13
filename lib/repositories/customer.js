const BaseRepository = require('./base');

/**
 * Customers repository
 * @extends BaseRepository
 */
class Customer extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return 'customers';
  }

  /**
   * Retrieves the authenticated customer
   * {@link https://docs.commercetools.com/http-api-projects-customers#authenticate-customer-sign-in}
   * @param {Object} body
   * @param {string} body.email - customer e-mail
   * @param {string} body.password - customer password
   * @param {string} body.anonymousCartId - anonymous cart ID to be asigned
   * @param {string} body.anonymousCartSignInMode - {@link https://docs.commercetools.com/http-api-projects-customers#anonymouscartsigninmode}
   * @param {string} body.anonymousId - all orders and carts that have this anonymousId set will be assigned to the customer
   * @param {boolean} body.updateProductData - if true, lineItem product data of returned cart will be updated
   * @returns {Object} - {@link https://docs.commercetools.com/http-api-projects-customers#customersigninresult|CustomerSignInResult}
   */
  async login(body) {
    const {
      email,
      password,
      anonymousCartId,
      anonymousCartSignInMode,
      anonymousId,
      updateProductData
    } = body;

    const response = await this.connection.execute({
      uri: this.getRequestBuilder().login.parse({}).build(),
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        anonymousCartId,
        anonymousCartSignInMode,
        anonymousId,
        updateProductData
      })
    });

    return response.body;
  }

  /**
   * Updates customer's password
   * {@link https://docs.commercetools.com/http-api-projects-customers#change-customers-password}
   * @param {Object} body
   * @param {string} body.id - customer id
   * @param {number} body.version - customer version
   * @param {string} body.currentPassword - customer current password
   * @param {string} body.newPassword - new password
   * @returns {Object} - The updated customer
   */
  async passwordUpdate(body) {
    const { id, version, currentPassword, newPassword } = body;
    const response = await this.connection.execute({
      uri: this.getRequestBuilder().customersPassword.parse({}).build(),
      method: 'POST',
      body: JSON.stringify({ id, version, currentPassword, newPassword })
    });

    return response.body;
  }

  /**
   * Creates a token for resetting customer's password
   * {@link https://docs.commercetools.com/http-api-projects-customers#create-a-token-for-resetting-the-customers-password}
   * @param {Object} body
   * @param {string} body.email - customer e-mail
   * @param {number} body.ttlMinutes - validity of the generated token in minutes
   * @returns {Object} - {@link https://docs.commercetools.com/http-api-projects-customers#customertoken|CustomerToken}
   */
  async passwordToken(body) {
    const { email, ttlMinutes } = body;
    const response = await this.connection.execute({
      uri: this.getRequestBuilder().customersPasswordToken.parse({}).build(),
      method: 'POST',
      body: JSON.stringify({ email, ttlMinutes })
    });

    return response.body;
  }

  /**
   * Gets a customer by password token
   * {@link https://docs.commercetools.com/http-api-projects-customers#get-customer-by-password-token}
   * @param {string} token
   * @returns {Object} - customer
   */
  async getByPasswordToken(token) {
    const response = await this.connection.execute({
      uri: this.getRequestBuilder()
        .customersPasswordToken.parse({ token })
        .build(),
      method: 'GET'
    });

    return response.body;
  }

  /**
   * Sets a new password for the customer with the given token
   * {@link https://docs.commercetools.com/http-api-projects-customers#reset-customers-password}
   * @param {Object} body
   * @param {string} tokenValue - customer password token
   * @param {string} newPassword - new password
   * @param {number} version - Optional: customer version
   * @returns {Object} - customer
   */
  async passwordReset(body) {
    const { tokenValue, newPassword, version } = body;
    const response = await this.connection.execute({
      uri: this.getRequestBuilder().customersPasswordReset.parse({}).build(),
      method: 'POST',
      body: JSON.stringify({ tokenValue, newPassword, version })
    });

    return response.body;
  }

  /**
   * Creates a token for verifying the customer e-mail
   * {@link https://docs.commercetools.com/http-api-projects-customers#create-a-token-for-verifying-the-customers-email}
   * @param {Object} body
   * @param {string} id - customer ID
   * @param {number} version - Optional: customer version
   * @param {number} ttlMinutes - validity of the generated token in minutes
   * @returns {Object} - {@link https://docs.commercetools.com/http-api-projects-customers#customertoken|CustomerToken}
   */
  async emailToken(body) {
    const { id, version, ttlMinutes } = body;
    const response = await this.connection.execute({
      uri: this.getRequestBuilder()
        .customersEmailVerificationToken.parse({})
        .build(),
      method: 'POST',
      body: JSON.stringify({ id, version, ttlMinutes })
    });

    return response.body;
  }

  /**
   * Gets a customer by e-mail token
   * {@link https://docs.commercetools.com/http-api-projects-customers#get-customer-by-email-token}
   * @param {string} token
   * @returns {Object} - customer
   */
  async getByEmailToken(token) {
    const response = await this.connection.execute({
      uri: this.getRequestBuilder()
        .customersEmailVerificationToken.parse({ token })
        .build(),
      method: 'GET'
    });

    return response.body;
  }

  /**
   * Verifies customer e-mail with the given token
   * {@link https://docs.commercetools.com/http-api-projects-customers#verify-customers-email}
   * @param {Object} body
   * @param {number} version - Optional: customer version
   * @param {string} tokenValue - customer password token
   * @returns {Object} - customer
   */
  async verifyEmail(body) {
    const { version, tokenValue } = body;
    const response = await this.connection.execute({
      uri: this.getRequestBuilder()
        .customersEmailVerification.parse({})
        .build(),
      method: 'POST',
      body: JSON.stringify({ version, tokenValue })
    });

    return response.body;
  }
}

module.exports = Customer;
