const { createRequestBuilder } = require("@commercetools/api-request-builder");
const fetch = require("node-fetch");
const Connection = require("./lib/commercetools/connection");
const Repositories = require("./repositories");

module.exports = function(fastify, opts, next) {
  const {
    host,
    oauthHost,
    projectKey,
    clientId,
    clientSecret,
    concurrency,
    addLogger
  } = opts;

  const config = {
    commercetools: {
      auth: {
        host: oauthHost,
        projectKey,
        credentials: {
          clientId,
          clientSecret
        },
        fetch
      },
      middleware: {
        host,
        fetch
      },
      addLogger
    },
    concurrency: concurrency || 10
  };

  const connection = new Connection(config);

  const { client } = connection;

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
  const execute = async request => {
    try {
      return await client.execute(request);
    } catch (err) {
      if (typeof err === "object") {
        // eslint-disable-next-line
        const { headers, ...error } = err;
        throw error;
      }
      throw err;
    }
  };
  const requestBuilder = () => createRequestBuilder({ projectKey });
  const repositories = Repositories(connection);
  fastify.decorate("commercetools", {
    client: { ...client, execute },
    requestBuilder,
    repositories
  });

  next();
};
