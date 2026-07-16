import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../core/errors/CustomError";

function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    status: "error",
    statusCode: status,
    message,
  });
}

export { errorHandler };
