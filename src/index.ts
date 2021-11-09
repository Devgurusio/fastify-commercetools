// eslint-disable-next-line import/no-extraneous-dependencies
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";

import { FastifyCommercetoolsPluginOptions } from "./fastify-commercetools-opts-type";
import fastifyCommercetoolsPlugin from "./fastify-commercetools";

declare module "fastify" {
  interface FastifyInstance {
    commercetools: {
      requestBuilder: ByProjectKeyRequestBuilder;
    };
  }
}

export default fp(
  (
    fastify: FastifyInstance,
    opts: FastifyCommercetoolsPluginOptions,
    next: (err?: Error) => void
  ) => {
    if (!opts.http) {
      return next(new Error("Missing 'http' config attribute"));
    }
    if (!opts.projectKey) {
      return next(new Error("Missing 'projectKey' config attribute"));
    }
    return fastifyCommercetoolsPlugin(fastify, opts, next);
  },
  {
    name: "fastify-commercetools",
  }
);
