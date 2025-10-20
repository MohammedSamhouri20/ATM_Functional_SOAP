import { BaseDomainError } from "./BaseDomainError.js";

export class AccountNotFoundError extends BaseDomainError {
  constructor() {
    super("Account not found", 404);
  }
}
