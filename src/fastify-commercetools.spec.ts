// eslint-disable-next-line import/no-extraneous-dependencies
import { fastify, FastifyInstance } from "fastify";
import { ClientBuilder, Dispatch } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import fetch from "isomorphic-fetch";
import { FastifyCommercetoolsOptions } from "./fastify-commercetools-options";
import fastifyCommercetools from "./fastify-commercetools";
declare module "fastify" {
  interface FastifyInstance {
    commercetools: {
      requestBuilder: ByProjectKeyRequestBuilder;
    };
  }
}

jest.mock("isomorphic-fetch", () => {
  const originalModule = jest.requireActual("isomorphic-fetch");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => Promise.resolve(new Response())),
  };
});

const mockClientBuilder = {
  withProjectKey: jest.fn().mockReturnThis(),
  withHttpMiddleware: jest.fn().mockReturnThis(),
  withLoggerMiddleware: jest.fn().mockReturnThis(),
  withClientCredentialsFlow: jest.fn().mockReturnThis(),
  withMiddleware: jest.fn().mockReturnThis(),
  withQueueMiddleware: jest.fn().mockReturnThis(),
  build: jest.fn(() => ({ id: "client" })),
};

jest.mock("@commercetools/sdk-client-v2", () => {
  const originalModule = jest.requireActual("@commercetools/sdk-client-v2");
  return {
    __esModule: true,
    ...originalModule,
    ClientBuilder: jest.fn().mockImplementation(() => mockClientBuilder),
  };
});

const apiRoot = {
  withProjectKey: jest.fn(() => ({ id: "byProjectKeyRequestBuilder" })),
};

jest.mock("@commercetools/platform-sdk", () => {
  const originalModule = jest.requireActual("@commercetools/platform-sdk");
  return {
    __esModule: true,
    ...originalModule,
    createApiBuilderFromCtpClient: jest.fn(() => apiRoot),
  };
});

describe("Commercetools Plugin", () => {
  let server: FastifyInstance;
  let opts: FastifyCommercetoolsOptions;
  let customFetch: (
    input: RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<Response>;
  let clientBuilder: ClientBuilder;

  beforeAll(() => {
    clientBuilder = new ClientBuilder();
    customFetch = () => Promise.resolve(new Response());
  });
  beforeEach(() => {
    server = fastify();
  });

  describe("when auth provided", () => {
    describe("when fetch provided", () => {
      beforeAll(() => {
        opts = {
          auth: {
            host: "https://auth.commercetools.co",
            projectKey: "projectKey",
            credentials: {
              clientId: "clientId",
              clientSecret: "clientSecret",
            },
            fetch: customFetch,
          },
          http: {
            host: "https://api.commercetools.co",
            enableRetry: true,
            retryConfig: {
              maxRetries: 3,
            },
            fetch: customFetch,
          },
          projectKey: "projectKey",
        };
      });

      beforeEach((done) => {
        fastifyCommercetools(server, opts, done);
      });

      test("should call 'clientBuilder.withProjectKey'", () => {
        expect(clientBuilder.withProjectKey).toHaveBeenCalledWith(
          opts.projectKey
        );
      });

      test("should call 'clientBuilder.withHttpMiddleware'", () => {
        expect(clientBuilder.withHttpMiddleware).toHaveBeenCalledWith(
          opts.http
        );
      });

      test("should call 'clientBuilder.withLoggerMiddleware'", () => {
        expect(clientBuilder.withLoggerMiddleware).toHaveBeenCalled();
      });

      test("should call 'clientBuilder.withClientCredentialsFlow'", () => {
        expect(clientBuilder.withClientCredentialsFlow).toHaveBeenCalledWith(
          opts.auth
        );
      });

      test("should call 'clientBuilder.build'", () => {
        expect(clientBuilder.build).toHaveBeenCalled();
      });

      test("should call 'createApiBuilderFromCtpClient'", () => {
        expect(createApiBuilderFromCtpClient).toHaveBeenCalledWith({
          id: "client",
        });
      });

      test("should call 'apiRoot.withProjectKey'", () => {
        expect(apiRoot.withProjectKey).toHaveBeenCalledWith({
          projectKey: opts.projectKey,
        });
      });

      test("should add 'commercetools' property to fastify instance", () => {
        expect(server).toHaveProperty("commercetools");
      });

      test("fastify instance 'commercetools' property should have 'requestBuilder' property with byProjectKeyRequestBuilder", () => {
        expect(server.commercetools).toHaveProperty("requestBuilder", {
          id: "byProjectKeyRequestBuilder",
        });
      });
    });

    describe("when fetch not provided", () => {
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

      beforeEach((done) => {
        fastifyCommercetools(server, opts, done);
      });

      test("should call 'clientBuilder.withProjectKey'", () => {
        expect(clientBuilder.withProjectKey).toHaveBeenCalledWith(
          opts.projectKey
        );
      });

      test("should call 'clientBuilder.withHttpMiddleware'", () => {
        expect(clientBuilder.withHttpMiddleware).toHaveBeenCalledWith({
          ...opts.http,
          fetch,
        });
      });

      test("should call 'clientBuilder.withLoggerMiddleware'", () => {
        expect(clientBuilder.withLoggerMiddleware).toHaveBeenCalled();
      });

      test("should call 'clientBuilder.withClientCredentialsFlow'", () => {
        expect(clientBuilder.withClientCredentialsFlow).toHaveBeenCalledWith({
          ...opts.auth,
          fetch,
        });
      });

      test("should call 'clientBuilder.build'", () => {
        expect(clientBuilder.build).toHaveBeenCalled();
      });

      test("should call 'createApiBuilderFromCtpClient'", () => {
        expect(createApiBuilderFromCtpClient).toHaveBeenCalledWith({
          id: "client",
        });
      });

      test("should call 'apiRoot.withProjectKey'", () => {
        expect(apiRoot.withProjectKey).toHaveBeenCalledWith({
          projectKey: opts.projectKey,
        });
      });

      test("should add 'commercetools' property to fastify instance", () => {
        expect(server).toHaveProperty("commercetools");
      });

      test("fastify instance 'commercetools' property should have 'requestBuilder' property with byProjectKeyRequestBuilder", () => {
        expect(server.commercetools).toHaveProperty("requestBuilder", {
          id: "byProjectKeyRequestBuilder",
        });
      });
    });
  });

  describe("when middleware provided", () => {
    beforeAll(() => {
      opts = {
        http: {
          host: "https://api.commercetools.co",
          enableRetry: true,
          retryConfig: {
            maxRetries: 3,
          },
        },
        middleware: (next: Dispatch) => next,
        projectKey: "projectKey",
      };
    });

    beforeEach((done) => {
      fastifyCommercetools(server, opts, done);
    });

    test("should call 'clientBuilder.withProjectKey'", () => {
      expect(clientBuilder.withProjectKey).toHaveBeenCalledWith(
        opts.projectKey
      );
    });

    test("should call 'clientBuilder.withHttpMiddleware'", () => {
      expect(clientBuilder.withHttpMiddleware).toHaveBeenCalledWith({
        ...opts.http,
        fetch,
      });
    });

    test("should call 'clientBuilder.withLoggerMiddleware'", () => {
      expect(clientBuilder.withLoggerMiddleware).toHaveBeenCalled();
    });

    test("should call 'clientBuilder.withMiddleware'", () => {
      expect(clientBuilder.withMiddleware).toHaveBeenCalledWith(
        opts.middleware
      );
    });

    test("should call 'clientBuilder.build'", () => {
      expect(clientBuilder.build).toHaveBeenCalled();
    });

    test("should call 'createApiBuilderFromCtpClient'", () => {
      expect(createApiBuilderFromCtpClient).toHaveBeenCalledWith({
        id: "client",
      });
    });

    test("should call 'apiRoot.withProjectKey'", () => {
      expect(apiRoot.withProjectKey).toHaveBeenCalledWith({
        projectKey: opts.projectKey,
      });
    });

    test("should add 'commercetools' property to fastify instance", () => {
      expect(server).toHaveProperty("commercetools");
    });

    test("fastify instance 'commercetools' property should have 'requestBuilder' property with byProjectKeyRequestBuilder", () => {
      expect(server.commercetools).toHaveProperty("requestBuilder", {
        id: "byProjectKeyRequestBuilder",
      });
    });
  });

  describe("when queue provided", () => {
    beforeAll(() => {
      opts = {
        http: {
          host: "https://api.commercetools.co",
          enableRetry: true,
          retryConfig: {
            maxRetries: 3,
          },
        },
        queue: { concurrency: 10 },
        projectKey: "projectKey",
      };
    });

    beforeEach((done) => {
      fastifyCommercetools(server, opts, done);
    });

    test("should call 'clientBuilder.withProjectKey'", () => {
      expect(clientBuilder.withProjectKey).toHaveBeenCalledWith(
        opts.projectKey
      );
    });

    test("should call 'clientBuilder.withHttpMiddleware'", () => {
      expect(clientBuilder.withHttpMiddleware).toHaveBeenCalledWith({
        ...opts.http,
        fetch,
      });
    });

    test("should call 'clientBuilder.withLoggerMiddleware'", () => {
      expect(clientBuilder.withLoggerMiddleware).toHaveBeenCalled();
    });

    test("should call 'clientBuilder.withQueueMiddleware'", () => {
      expect(clientBuilder.withQueueMiddleware).toHaveBeenCalledWith(
        opts.queue
      );
    });

    test("should call 'clientBuilder.build'", () => {
      expect(clientBuilder.build).toHaveBeenCalled();
    });

    test("should call 'createApiBuilderFromCtpClient'", () => {
      expect(createApiBuilderFromCtpClient).toHaveBeenCalledWith({
        id: "client",
      });
    });

    test("should call 'apiRoot.withProjectKey'", () => {
      expect(apiRoot.withProjectKey).toHaveBeenCalledWith({
        projectKey: opts.projectKey,
      });
    });

    test("should add 'commercetools' property to fastify instance", () => {
      expect(server).toHaveProperty("commercetools");
    });

    test("fastify instance 'commercetools' property should have 'requestBuilder' property with byProjectKeyRequestBuilder", () => {
      expect(server.commercetools).toHaveProperty("requestBuilder", {
        id: "byProjectKeyRequestBuilder",
      });
    });
  });

  describe("when only required properties", () => {
    describe("when fetch provided", () => {
      beforeAll(() => {
        opts = {
          http: {
            host: "https://api.commercetools.co",
            enableRetry: true,
            retryConfig: {
              maxRetries: 3,
            },
            fetch: customFetch,
          },
          projectKey: "projectKey",
        };
      });

      beforeEach((done) => {
        fastifyCommercetools(server, opts, done);
      });

      test("should call 'clientBuilder.withProjectKey'", () => {
        expect(clientBuilder.withProjectKey).toHaveBeenCalledWith(
          opts.projectKey
        );
      });

      test("should call 'clientBuilder.withHttpMiddleware'", () => {
        expect(clientBuilder.withHttpMiddleware).toHaveBeenCalledWith(
          opts.http
        );
      });

      test("should call 'clientBuilder.withLoggerMiddleware'", () => {
        expect(clientBuilder.withLoggerMiddleware).toHaveBeenCalled();
      });

      test("should not call 'clientBuilder.withClientCredentialsFlow'", () => {
        expect(clientBuilder.withClientCredentialsFlow).not.toHaveBeenCalled();
      });

      test("should not call 'clientBuilder.withMiddleware'", () => {
        expect(clientBuilder.withMiddleware).not.toHaveBeenCalled();
      });

      test("should not call 'clientBuilder.withQueueMiddleware'", () => {
        expect(clientBuilder.withQueueMiddleware).not.toHaveBeenCalled();
      });

      test("should call 'clientBuilder.build'", () => {
        expect(clientBuilder.build).toHaveBeenCalled();
      });

      test("should call 'createApiBuilderFromCtpClient'", () => {
        expect(createApiBuilderFromCtpClient).toHaveBeenCalledWith({
          id: "client",
        });
      });

      test("should call 'apiRoot.withProjectKey'", () => {
        expect(apiRoot.withProjectKey).toHaveBeenCalledWith({
          projectKey: opts.projectKey,
        });
      });

      test("should add 'commercetools' property to fastify instance", () => {
        expect(server).toHaveProperty("commercetools");
      });

      test("fastify instance 'commercetools' property should have 'requestBuilder' property with byProjectKeyRequestBuilder", () => {
        expect(server.commercetools).toHaveProperty("requestBuilder", {
          id: "byProjectKeyRequestBuilder",
        });
      });
    });

    describe("when fetch not provided", () => {
      beforeAll(() => {
        opts = {
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

      beforeEach((done) => {
        fastifyCommercetools(server, opts, done);
      });

      test("should call 'clientBuilder.withProjectKey'", () => {
        expect(clientBuilder.withProjectKey).toHaveBeenCalledWith(
          opts.projectKey
        );
      });

      test("should call 'clientBuilder.withHttpMiddleware'", () => {
        expect(clientBuilder.withHttpMiddleware).toHaveBeenCalledWith({
          ...opts.http,
          fetch,
        });
      });

      test("should call 'clientBuilder.withLoggerMiddleware'", () => {
        expect(clientBuilder.withLoggerMiddleware).toHaveBeenCalled();
      });

      test("should not call 'clientBuilder.withClientCredentialsFlow'", () => {
        expect(clientBuilder.withClientCredentialsFlow).not.toHaveBeenCalled();
      });

      test("should not call 'clientBuilder.withMiddleware'", () => {
        expect(clientBuilder.withMiddleware).not.toHaveBeenCalled();
      });

      test("should not call 'clientBuilder.withQueueMiddleware'", () => {
        expect(clientBuilder.withQueueMiddleware).not.toHaveBeenCalled();
      });

      test("should call 'clientBuilder.build'", () => {
        expect(clientBuilder.build).toHaveBeenCalled();
      });

      test("should call 'createApiBuilderFromCtpClient'", () => {
        expect(createApiBuilderFromCtpClient).toHaveBeenCalledWith({
          id: "client",
        });
      });

      test("should call 'apiRoot.withProjectKey'", () => {
        expect(apiRoot.withProjectKey).toHaveBeenCalledWith({
          projectKey: opts.projectKey,
        });
      });

      test("should add 'commercetools' property to fastify instance", () => {
        expect(server).toHaveProperty("commercetools");
      });

      test("fastify instance 'commercetools' property should have 'requestBuilder' property with byProjectKeyRequestBuilder", () => {
        expect(server.commercetools).toHaveProperty("requestBuilder", {
          id: "byProjectKeyRequestBuilder",
        });
      });
    });
  });
});
