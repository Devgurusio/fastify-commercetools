# fastify-commercetools

commercetools fastify plugin that decorates fastify with commercetools key.
commercetoos decorator contains:

- [client](https://www.npmjs.com/package/@commercetools/api-request-builder)
  commercetools client to execute requests
- [requestBuilder](https://www.npmjs.com/package/@commercetools/sdk-client)
  util for build API uris

## Install

```
npm i fastify-commercetools --save
```

## Usage

### Register the plugin

Add it to your project with `register` and pass it some basic options.

```js
const fastify = require("fastify")();

fastify.register(require("fastify-commercetools"), {
  commercetools: {
    host: "https://api.commercetools.co",
    oauthHost: "https://auth.commercetools.co",
    projectKey: "projectKey",
    clientId: "clientId",
    clientSecret: "clientSecret",
    concurrency: 5
  }
});
```

Once you have register the plugin you can use the commercetools decorator to
perform actions

### Using it as commercetools sdk

```js
fastify.post("/", schemas.signUp, async (request, reply) => {
  const { client, requestBuilder } = fastify.commercetools;
  const { email, password } = request.body;

  try {
    const response = await client.execute({
      uri: requestBuilder().customers.build(),
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    reply.code(200).send(response.body.customer);
  } catch (error) {
    handleCTError(request, reply, error);
  }
});
```

### Using it as service

```js
fastify.post("/", schemas.signUp, async (request, reply) => {
  const { CustomerRepository } = fastify.commercetools.repositories;
  const { email, password } = request.body;

  try {
    const customer = await CustomerRepository.create({ email, password });

    reply.code(200).send(customer);
  } catch (error) {
    handleCTError(request, reply, error);
  }
});
```
