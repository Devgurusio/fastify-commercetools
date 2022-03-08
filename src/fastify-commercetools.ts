// eslint-disable-next-line import/no-extraneous-dependencies
import { FastifyInstance } from "fastify";
import {
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import fetch from "isomorphic-fetch";

import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from "@commercetools/platform-sdk";
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";

import { FastifyCommercetoolsPluginOptions } from "./fastify-commercetools-opts-type";

export default (
  fastify: FastifyInstance,
  opts: FastifyCommercetoolsPluginOptions,
  next: (err?: Error) => void
) => {
  const { auth, http, projectKey } = opts;

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    ...http,
    fetch: http.fetch || fetch,
  };

  const clientBuilder: ClientBuilder = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware();

  if (auth) {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      ...auth,
      fetch: auth.fetch || fetch,
    };
    clientBuilder.withClientCredentialsFlow(authMiddlewareOptions);
  }

  const ctpClient: Client = clientBuilder.build();

  const apiRoot: ApiRoot = createApiBuilderFromCtpClient(ctpClient);
  const requestBuilder: ByProjectKeyRequestBuilder = apiRoot.withProjectKey({
    projectKey,
  });

  // eslint-disable-next-line no-param-reassign
  fastify.commercetools = { requestBuilder };

  next();
};