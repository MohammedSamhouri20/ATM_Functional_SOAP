import { TransactionType } from "../enums/TransactionType.js";
import type { Response } from "../types/Response.js";
import { AppDataSource } from "../AppDataSource.js";
import { Account } from "../entities/Account.js";
import { Transaction } from "../entities/Transaction.js";
import { AccountNotFoundError } from "../errors/AccountNotFoundError.js";
import { InsufficientFundsError } from "../errors/InsufficientFundsError.js";

export async function withdraw({accountId, amount}: {accountId: number, amount: number}): Promise<Response<Transaction | null>> {
    const accountRepository = AppDataSource.getRepository(Account);
    const account = await accountRepository.findOneBy({id: accountId});

    if (account == null) {
        throw new AccountNotFoundError();
    }

    const balance = parseFloat(account.balance.toString());
    if (balance < amount) {
       throw new InsufficientFundsError();
    }

    const newBalance = balance - amount;
    account.balance = newBalance;
    await accountRepository.save(account);

    const transactionRepo = AppDataSource.getRepository(Transaction);
    const newTransaction : Transaction = transactionRepo.create({account: account, amount: amount, availableBalance: newBalance, type: TransactionType.Withdraw});
    await transactionRepo.save(newTransaction);

    return { data: newTransaction, success: true, message: `Withdrawal success` };
}

export async function deposit({accountId, amount}: {accountId : number, amount: number}) : Promise<Response<Transaction | null>> {
    const accountRepository = AppDataSource.getRepository(Account);
    const account = await accountRepository.findOneBy({id: accountId});

    if (account == null) {
        throw new AccountNotFoundError();
    }

    const balance = parseFloat(account.balance.toString());
    const newBalance = balance + amount;
    account.balance = newBalance;

    await accountRepository.save(account);

    const transactionRepo = AppDataSource.getRepository(Transaction);
    const newTransaction : Transaction = transactionRepo.create({account: account, amount: amount, availableBalance: newBalance, type: TransactionType.Deposit});
    await transactionRepo.save(newTransaction);

    return { data: newTransaction, success: true, message: "Deposit success" };
    
}