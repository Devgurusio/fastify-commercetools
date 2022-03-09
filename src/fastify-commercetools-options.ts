import {
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

export interface FastifyCommercetoolsOptions {
  auth?: AuthMiddlewareOptions;
  http: HttpMiddlewareOptions;
  projectKey: string;
}
