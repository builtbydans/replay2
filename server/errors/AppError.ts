export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 500, code = "APPLICATION_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function notImplemented(message: string): AppError {
  return new AppError(message, 501, "NOT_IMPLEMENTED");
}

