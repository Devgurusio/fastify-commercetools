# fastify-commercetools

commercetools fastify plugin that decorates fastify with commercetools key.
commercetoos decorator contains:

-   [requestBuilder](https://www.npmjs.com/package/@commercetools/platform-sdk) commercetools by project key request builder

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
  auth: {
    host: "https://auth.commercetools.co",
    projectKey: "projectKey",
    credentials: {
      clientId: "clientId",
      clientSecret: "clientSecret"
    }
  },
  http: {
    host: "https://api.commercetools.co",
    enableRetry: true,
    retryConfig: {
      maxRetries: 3
    },
  },
  projectKey: "projectKey"
});
```

Once you have register the plugin you can use the commercetools decorator to
perform actions

### Using it

```js
fastify.post("/", schemas.signUp, async (request, reply) => {
  const { commercetools: { requestBuilder } } = fastify;
  const { body } = request;

  try {
    const customerSignInResult = await requestBuilder()
      .customers()
      .post({ body })
      .execute();

    reply.code(200).send(customerSignInResult.body.customer);
  } catch (error) {
    handleCTError(request, reply, error);
  }
});
```

## Warning

This version is not backward compatible with version 1.x.x
