import 'dotenv/config';
import { AppDataSource } from "./AppDataSource.js";
import fastify from "./fastify-app.js";
import nextjsApp from "./nextjs-app.js";

const fastifyApp = fastify({
  logger: true,
  pluginTimeout: 50000,
  bodyLimit: 15485760,
});

try {
  await nextjsApp.prepare();
  await AppDataSource.initialize();
  await fastifyApp.listen({ port: Number(process.env.PORT!), host: process.env.HOST! });
  fastifyApp.log.info(`Server started on ${process.env.PORT}:${process.env.HOST}`);

} catch (err) {
  fastifyApp.log.error(err);
  process.exit(1);
}