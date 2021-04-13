const fp = require('fastify-plugin');
const commercetools = require('./commercetools');

/**
 * @callback next
 */

/**
 * Fastify commercetool plugin
 * @conscturctor
 * @param {Object} fastify - fastify server instance
 * @param {Object} opts - options object
 * @param {Object} opts.commercetools - commercetools options object
 * @param {Object} opts.commercetools.host - commercetools API host
 * @param {Object} opts.commercetools.oauthHost - commercetools oauth host
 * @param {Object} opts.commercetools.projectKey - commercetools project key
 * @param {Object} opts.commercetools.clientId - commercetools project Client ID
 * @param {Object} opts.commercetools.clientSecret - commercetools project Client Secret
 * @param {Object} opts.commercetools.concurrency - max parallel tasks (default 10)
 * @param {Object} opts.commercetools.addLogger - Indicates if add the createLoggerMiddleware or not
 * @param {next} next - The callback next funcion
 */
function plugin(fastify, opts, next) {
  if (!opts.commercetools) {
    return next(new Error('Missing commercetools key in options'));
  }
  const {
    host,
    oauthHost,
    projectKey,
    clientId,
    clientSecret
  } = opts.commercetools;
  if (!host) {
    return next(new Error('Missing commercetools.host'));
  } else if (!oauthHost) {
    return next(new Error('Missing commercetools.oauthHost'));
  } else if (!projectKey) {
    return next(new Error('Missing commercetools.projectKey'));
  } else if (!clientId) {
    return next(new Error('Missing commercetools.clientId'));
  } else if (!clientSecret) {
    return next(new Error('Missing commercetools.clientSecret'));
  }
  commercetools(fastify, opts.commercetools, next);
}

module.exports = fp(plugin, {
  name: 'fastify-commercetools'
});
