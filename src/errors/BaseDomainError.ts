export class BaseDomainError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}
