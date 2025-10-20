import {
  checkBalance as checkBalanceService,
  viewTransactionHistory,
} from "../services/accountService.js";

export const CheckBalance = async (
  args: { accountId: number },
  callback: any
) => {
  try {
    const result = await checkBalanceService({ accountId: args.accountId });
    callback(null, result);
  } catch (error: any) {
    callback({
      fault: {
        faultcode: "soap:Server",
        faultstring: error.message || "CheckBalance failed",
      },
    });
  }
};

export const ViewTransactions = async (
  args: { accountId: number },
  callback: any
) => {
  try {
    const result = await viewTransactionHistory({ accountId: args.accountId });
    callback(null, result);
  } catch (error: any) {
    callback({
      fault: {
        faultcode: "soap:Server",
        faultstring: error.message || "ViewTransactions failed",
      },
    });
  }
};
