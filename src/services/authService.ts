// import { TransactionType } from "../enums/TransactionType.js";
// import type { Transaction } from "../types/Transaction.js";
// import { getAccountById, updateAccountBalanceById } from "../repositories/AccountRepository.js";
// import type { Response } from "../types/Response.js";
// import { addTransaction, getTransactionsByAccountId } from "../repositories/TransactionRepository.js";

// export async function authenticateAccount({accountId, pin}: {accountId: number, pin: string}): Promise<Response<boolean>> {
//     const account = await getAccountById({accountId});
//     if (account == null || account.pin != pin) {
//         return {data: false, success: false, message: "Account not found or Incorrect PIN number"};
//     }

//     return {data: true, success: true,  message: "Authentication success"};
// }