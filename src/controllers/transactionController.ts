import type { FastifyReply, FastifyRequest } from "fastify";
import {
  withdraw as withdrawService,
  deposit as depositService,
} from "../services/transactionService.js";

export const Deposit = async (
  args: { accountId: number; amount: number },
  callback: any
) => {
  try {
    const result = await depositService({
      accountId: args.accountId,
      amount: Number(args.amount),
    });
    callback(null, result);
  } catch (error: any) {
    callback({
      fault: {
        faultcode: "soap:Server",
        faultstring: error.message || "Deposit failed",
      },
    });
  }
};

export const Withdraw = async (
  args: { accountId: number; amount: number },
  callback: any
) => {
  try {
    const result = await withdrawService({
      accountId: args.accountId,
      amount: Number(args.amount),
    });
    callback(null, result);
  } catch (error: any) {
    callback({
      fault: {
        faultcode: "soap:Server",
        faultstring: error.message || "Withdraw failed",
      },
    });
  }
};
