import { Request, Response, NextFunction } from "express";
import { prisma } from "../../infrastructure/databases/prismaClient";

import { ForbiddenError } from "../../core/errors/Errors";
import { JWT } from "../../infrastructure/utils/JWT";

type TokenPaylod = {
  id: string;
  role: string;
  type?: string;
  sessionVersion?: number;
  iat: number;
  exp: number;
};

const jwtService = new JWT();

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new ForbiddenError("Token not provided"));
  }

  const [token, _] = authorization.split(" ");

  try {
    const decoded = await jwtService.verify(token);

    const { id, role, type, sessionVersion } = decoded as TokenPaylod;

    if (type && type !== 'access') {
      return next(new ForbiddenError("Token inválido para esta operação."));
    }

    const admin = await prisma.admin.findUnique({
      where: { id },
      select: { active: true, sessionVersion: true }
    });

    if (!admin || !admin.active || admin.sessionVersion !== sessionVersion) {
      return next(new ForbiddenError("Token invalid"));
    }

    req.user_id = id;
    (req as any).user_role = role;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(new ForbiddenError("Token expirado")); // Específico para o frontend saber que expirou e chamar o refresh
    }
    return next(new ForbiddenError("Token invalid"));
  }
};

export { AuthMiddleware };
