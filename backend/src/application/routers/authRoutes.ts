import { Router, Request, Response, NextFunction } from "express";

import { AuthController } from "../controllers/AuthController";

const router = Router();

const authController = new AuthController();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  authController.signIn(req, res, next);
});

router.post(
  "/recover/password",
  (req: Request, res: Response, next: NextFunction) => {
    authController.recoverPassword(req, res, next);
  }
);

export { router as authRoutes };
