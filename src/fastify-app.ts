import Fastify, { type FastifyServerOptions } from 'fastify';
import accountRoutes from './routes/accountRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import nextjsApp from "./nextjs-app.js";
import { parse } from 'url';

const nextjsHandler = nextjsApp.getRequestHandler();

export default (opts?: FastifyServerOptions) => {
  const fastify = Fastify(opts);

  fastify.setErrorHandler((err, request, reply) => {
    const status = (err as any).statusCode ?? 500;
    reply.code(status).send({
      success: false,
      message: err.message || "Internal Server Error",
    });
  });

  fastify.register(accountRoutes, { prefix: '/accounts' });
  fastify.register(transactionRoutes, { prefix: '/transactions' });

  const NEXTJS_APP_ROOT = "/nextjs-app";
  fastify.all(`${NEXTJS_APP_ROOT}*`, (request, reply) => {
    const nextjsAppUrl = parse(request.url.replace(NEXTJS_APP_ROOT, "") || "/", true);
    nextjsHandler(request.raw, reply.raw, nextjsAppUrl).then(() => {
      reply.hijack();
      reply.raw.end();
    });
  });

  fastify.all("/_next*", (request, reply) => {
    nextjsHandler(request.raw, reply.raw).then(() => {
      reply.hijack();
      reply.raw.end();
    });
  });

  return fastify;
}
