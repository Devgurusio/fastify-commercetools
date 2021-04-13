const { createClient } = require('@commercetools/sdk-client');
const {
  createAuthMiddlewareForClientCredentialsFlow
} = require('@commercetools/sdk-middleware-auth');
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
const {
  createQueueMiddleware
} = require('@commercetools/sdk-middleware-queue');
const {
  createUserAgentMiddleware
} = require('@commercetools/sdk-middleware-user-agent');
const {
  createLoggerMiddleware
} = require('@commercetools/sdk-middleware-logger');

function createCustomLoggerMiddleware(loggingConfig) {
  const log = loggingConfig.logger || console;

  return function (next) {
    return function (request, response) {
      const { uri, method, headers } = request;
      const { error, body, statusCode } = response;
      if (loggingConfig.request) {
        log.info('CT Request');
        log.info('uri', uri);
        log.info('method', method);
        log.info('headers', headers);
      }
      log.info('CT Response');
      log.info('statusCode', statusCode);
      if (loggingConfig.error && error) {
        log.error('error', error);
      }
      if (loggingConfig.body && !error) {
        log.info('body', body);
      }
      next(request, response);
    };
  };
}

class Connection {
  /**
   * @param {Object} config - Default config
   * @param {Object} config.commercetools - commercetools config
   * @param {Object} config.commercetools.auth - commercetools auth config
   * @param {string} config.commercetools.auth.host - commercetools oauth host
   * @param {string} config.commercetools.auth.projectKey - commercetools project key
   * @param {Object} config.commercetools.auth.credentials - commercetools auth credentials
   * @param {string} config.commercetools.auth.credentials.clientId - commercetools project Client ID
   * @param {string} config.commercetools.auth.credentials.clientSecret - commercetools project Client Secret
   * @param {Object} config.commercetools.auth.fetch - fetch module to use with commercetools sdk
   * @param {Object} config.commercetools.middleware - commercetools middleware config
   * @param {string} config.commercetools.middleware.host - commercetools API host
   * @param {string} config.commercetools.middleware.fetch - fetch module to use with commercetools sdk
   * @param {number} config.concurrency - max parallel tasks (default 10)
   */
  constructor(config) {
    const { commercetools, concurrency } = config;
    const { auth, middleware, loggingConfig } = commercetools;
    this.projectKey = auth.projectKey;

    let middlewares = [
      createAuthMiddlewareForClientCredentialsFlow(auth),
      createQueueMiddleware({ concurrency: concurrency || 10 }),
      createHttpMiddleware(middleware),
      createUserAgentMiddleware({
        libraryName: 'fastify-commercetools',
        libraryVersion: '1.0.0',
        contactUrl: 'https://bitbucket.org/devgurus/fastify-commercetools',
        contactEmail: 'support@devgurus.io'
      })
    ];

    if (loggingConfig.enable) {
      const loggerMiddleware = loggingConfig.useFastifyLogger
        ? createCustomLoggerMiddleware(loggingConfig)
        : createLoggerMiddleware();
      middlewares = [...middlewares, loggerMiddleware];
    }

    this.client = createClient({
      middlewares
    });
  }

  /**
   * Executes the given request
   *
   * @param {Object} request - commercetools request
   * @param {string} request.uri - URI
   * @param {string} request.method - HTTP Method
   * @param {string} request.body - Body
   *
   * @returns {Object} - commercetools response
   */
  async execute(request) {
    try {
      return await this.client.execute(request);
    } catch (err) {
      if (typeof err === 'object') {
        // eslint-disable-next-line
        const { headers, ...error } = err;
        throw error;
      }
      throw err;
    }
  }
}

module.exports = Connection;
