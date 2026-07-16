import { CustomError } from "./CustomError";

class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}

class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

export {
  ForbiddenError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  ValidationError,
  InternalServerError,
};
