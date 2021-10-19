const Fastify = require('fastify');
const fastifyCommercetools = require('../index');

const commercetoolsInfo = {
  commercetools: {
    host: 'https://api.commercetools.co',
    oauthHost: 'https://auth.commercetools.co',
    projectKey: 'projectKey',
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    concurrency: 5
  }
};

describe('Plugin', () => {
  test('should fail when no options provided', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, undefined);
    fastify.ready(err => {
      expect(err).toBeDefined();
      done();
    });
  });
  test('should fail when no commercetools option provided', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, {});
    fastify.ready(err => {
      expect(err).toBeDefined();
      done();
    });
  });
  test('should fail when no commercetools.host option provided', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, {
      commercetools: { ...commercetoolsInfo.commercetools, host: null }
    });
    fastify.ready(err => {
      expect(err).toBeDefined();
      done();
    });
  });
  test('should fail when no commercetools.oauthHost option provided', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, {
      commercetools: { ...commercetoolsInfo.commercetools, oauthHost: null }
    });
    fastify.ready(err => {
      expect(err).toBeDefined();
      done();
    });
  });
  test('should fail when no commercetools.projectKey option provided', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, {
      commercetools: {
        ...commercetoolsInfo.commercetools,
        projectKey: null
      }
    });
    fastify.ready(err => {
      expect(err).toBeDefined();
      done();
    });
  });
  test('should fail when no commercetools.clientId option provided', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, {
      commercetools: { ...commercetoolsInfo.commercetools, clientId: null }
    });
    fastify.ready(err => {
      expect(err).toBeDefined();
      done();
    });
  });
  test('should fail when no commercetools.clientSecret option provided', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, {
      commercetools: {
        ...commercetoolsInfo.commercetools,
        clientSecret: null
      }
    });
    fastify.ready(err => {
      expect(err).toBeDefined();
      done();
    });
  });
  test('should not fail when no commercetools.concurrency option provided', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, {
      commercetools: {
        ...commercetoolsInfo.commercetools,
        concurrency: null
      }
    });
    fastify.ready(err => {
      expect(err).toBeUndefined();
      done();
    });
  });
  test('fastify.read should not return error', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, commercetoolsInfo);

    fastify.ready(err => {
      expect(err).toBeUndefined();
      done();
    });
  });
  test('fastify.commercetools should exist', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, commercetoolsInfo);

    fastify.ready(() => {
      expect(fastify.commercetools).toBeDefined();
      done();
    });
  });
  test('fastify.commercetools.client should be defined', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, commercetoolsInfo);

    fastify.ready(() => {
      expect(fastify.commercetools.client).toBeDefined();
      done();
    });
  });
  test('fastify.commercetools.requestBuilder should be defined', done => {
    const fastify = Fastify();
    fastify.register(fastifyCommercetools, commercetoolsInfo);

    fastify.ready(() => {
      expect(fastify.commercetools.requestBuilder).toBeDefined();
      done();
    });
  });
});
