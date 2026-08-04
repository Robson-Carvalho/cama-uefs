import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../core/errors/CustomError";

function errorHandler(
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
    return;
  }

  // Se não for um CustomError (ex: erro cru do Prisma ou do Node), logamos no console mas ocultamos do usuário final
  console.error("Unhandled Exception:", err);

  res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Erro interno do servidor. Tente novamente mais tarde.",
  });
}

export { errorHandler };
