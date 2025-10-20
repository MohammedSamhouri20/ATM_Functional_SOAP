import type { Response } from "../types/Response.js";
import { AppDataSource } from "../AppDataSource.js";
import { Account } from "../entities/Account.js";
import type { Transaction } from "../entities/Transaction.js";
import { AccountNotFoundError } from "../errors/AccountNotFoundError.js";

export async function checkBalance({
  accountId,
}: {
  accountId: number;
}): Promise<Response<number>> {
  const accountRepository = AppDataSource.getRepository(Account);
  const account = await accountRepository.findOneBy({ id: accountId });

  if (account == null) {
    throw new AccountNotFoundError();
  }

  return {
    data: account.balance,
    success: true,
    message: "Balance retrieved successfully",
  };
}

export async function viewTransactionHistory({
  accountId,
}: {
  accountId: number;
}): Promise<Response<unknown[]>> {
  const accountRepository = AppDataSource.getRepository(Account);
  const account: Account | null = await accountRepository.findOne({
    where: { id: accountId },
    relations: ["transactions"],
  });

  if (account == null) {
    throw new AccountNotFoundError();
  }

  const transactions = account.transactions.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
  }));

  return {
    data: transactions,
    success: true,
    message: "Transactions retrieved successfully",
  };
}
