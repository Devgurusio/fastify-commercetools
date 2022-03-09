// eslint-disable-next-line import/no-extraneous-dependencies
import { fastify, FastifyInstance } from "fastify";
import { FastifyCommercetoolsOptions } from "./fastify-commercetools-options";
import plugin from "./index";
import fastifyCommercetools from "./fastify-commercetools";

jest.mock("./fastify-commercetools", () => {
  const originalModule = jest.requireActual("./fastify-commercetools");

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(
      (
        instance: FastifyInstance,
        options: FastifyCommercetoolsOptions,
        next: (err?: Error) => void
      ) => next()
    ),
  };
});

describe("Plugin", () => {
  let server: FastifyInstance;
  let opts: FastifyCommercetoolsOptions;

  describe("when success", () => {
    beforeAll(() => {
      opts = {
        auth: {
          host: "https://auth.commercetools.co",
          projectKey: "projectKey",
          credentials: {
            clientId: "clientId",
            clientSecret: "clientSecret",
          },
        },
        http: {
          host: "https://api.commercetools.co",
          enableRetry: true,
          retryConfig: {
            maxRetries: 3,
          },
        },
        projectKey: "projectKey",
      };
    });

    beforeEach(() => {
      server = fastify();
      server.register(plugin, opts);
    });

    test("should call fastifyCommercetools", (done) => {
      server.ready(() => {
        expect(fastifyCommercetools).toHaveBeenCalled();
        done();
      });
    });

    test("fastify.read should not return error", (done) => {
      server.ready((err) => {
        expect(err).toBeUndefined();
        done();
      });
    });
  });

  describe("when error", () => {
    describe("when no 'http' config attribute provided", () => {
      beforeAll(() => {
        opts = <any>{
          auth: {
            host: "https://auth.commercetools.co",
            projectKey: "projectKey",
            credentials: {
              clientId: "clientId",
              clientSecret: "clientSecret",
            },
          },
          projectKey: "projectKey",
        };
      });

      beforeEach(() => {
        server = fastify();
        server.register(plugin, opts);
      });

      test("should not call fastifyCommercetools", (done) => {
        server.ready(() => {
          expect(fastifyCommercetools).not.toHaveBeenCalled();
          done();
        });
      });

      test("fastify.read should return error", (done) => {
        server.ready((err) => {
          expect(err).not.toBeUndefined();
          done();
        });
      });
    });

    describe("when no 'projectKey' config attribute provided", () => {
      beforeAll(() => {
        opts = <any>{
          auth: {
            host: "https://auth.commercetools.co",
            projectKey: "projectKey",
            credentials: {
              clientId: "clientId",
              clientSecret: "clientSecret",
            },
          },
          http: {
            host: "https://api.commercetools.co",
            enableRetry: true,
            retryConfig: {
              maxRetries: 3,
            },
          },
        };
      });

      beforeEach(() => {
        server = fastify();
        server.register(plugin, opts);
      });

      test("should not call fastifyCommercetools", (done) => {
        server.ready(() => {
          expect(fastifyCommercetools).not.toHaveBeenCalled();
          done();
        });
      });

      test("fastify.read should return error", (done) => {
        server.ready((err) => {
          expect(err).not.toBeUndefined();
          done();
        });
      });
    });
  });
});
