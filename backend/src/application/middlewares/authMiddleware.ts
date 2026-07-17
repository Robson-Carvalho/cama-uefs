import { Request, Response, NextFunction } from "express";

import { ForbiddenError } from "../../core/errors/Errors";
import { JWT } from "../../infrastructure/utils/JWT";

type TokenPaylod = {
  id: string;
  role: string;
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

    const { id, role } = decoded as TokenPaylod;

    req.user_id = id;
    (req as any).user_role = role;

    next();
  } catch (error) {
    return next(new ForbiddenError("Token invalid"));
  }
};

export { AuthMiddleware };
