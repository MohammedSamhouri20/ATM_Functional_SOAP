import { BaseDomainError } from "./BaseDomainError.js";

export class InsufficientFundsError extends BaseDomainError {
  constructor() {
    super("Insufficient funds", 400);
  }
}
