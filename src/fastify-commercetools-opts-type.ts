import { FastifyPluginOptions } from "fastify";
import {
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

export type FastifyCommercetoolsPluginOptions = FastifyPluginOptions & {
  auth?: AuthMiddlewareOptions;
  http: HttpMiddlewareOptions;
  projectKey: string;
};
