import {
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  Middleware,
  QueueMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

export interface FastifyCommercetoolsOptions {
  auth?: AuthMiddlewareOptions;
  http: HttpMiddlewareOptions;
  middleware?: Middleware;
  queue?: QueueMiddlewareOptions;
  projectKey: string;
}
