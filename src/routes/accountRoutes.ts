import type { FastifyInstance } from "fastify";
import { checkBalance, viewTransactionHistory } from "../controllers/accountController.js";
import accountsParamsSchema from "../schemas/accountsParamsSchema.js";

async function accountRoutes(app: FastifyInstance) {
    app.get('/:id/balance', {schema: accountsParamsSchema}, checkBalance);
    app.get('/:id/transactions', {schema: accountsParamsSchema}, viewTransactionHistory);
}

export default accountRoutes;