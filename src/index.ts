// eslint-disable-next-line import/no-extraneous-dependencies
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";

import { FastifyCommercetoolsOptions } from "./fastify-commercetools-options";
import fastifyCommercetoolsPlugin from "./fastify-commercetools";

export { FastifyCommercetoolsOptions };
declare module "fastify" {
  export interface FastifyInstance {
    commercetools: {
      requestBuilder: ByProjectKeyRequestBuilder;
    };
  }
}

export default fp<FastifyCommercetoolsOptions>(
  (
    fastify: FastifyInstance,
    opts: FastifyCommercetoolsOptions,
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
