import type { FastifyInstance } from "fastify";
import transactionsBodySchema from "../schemas/transactionsBodySchema.js";
import { deposit, withdraw } from "../controllers/transactionController.js";

async function transactionRoutes(app: FastifyInstance) {
    app.post('/withdraw', {schema: transactionsBodySchema}, withdraw);
    app.post('/deposit', {schema: transactionsBodySchema}, deposit);
}

export default transactionRoutes;