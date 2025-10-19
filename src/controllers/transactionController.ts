import type { FastifyReply, FastifyRequest } from 'fastify';
import {  withdraw as withdrawService, deposit as depositService  } from '../services/transactionService.js';

export const deposit = async (request: FastifyRequest<{Body: {accountId: number, amount: number}}>, reply: FastifyReply) => {
    const amount: number = request.body.amount;
    const accountId: number = request.body.accountId;

    const transaction = await depositService({amount, accountId});

    return reply.code(201).send(transaction);
}

export const withdraw = async (request: FastifyRequest<{Body: {accountId: number, amount: number}}>, reply: FastifyReply) => {
    const amount: number = request.body.amount;
    const accountId: number = request.body.accountId;

    const transaction = await withdrawService({amount, accountId});
    
    return reply.code(201).send(transaction);
}