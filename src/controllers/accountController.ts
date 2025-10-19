import type { FastifyReply, FastifyRequest } from "fastify";
import { checkBalance as checkBalanceService, viewTransactionHistory as viewTransactionHistoryService } from "../services/accountService.js";

export const checkBalance = async (request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) => {
    const balance = await checkBalanceService({accountId: request.params.id});

    return reply.code(200).send(balance);
}

export const viewTransactionHistory = async (request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) => {
    const transactions = await viewTransactionHistoryService({accountId: request.params.id});

    return reply.code(200).send(transactions);
}