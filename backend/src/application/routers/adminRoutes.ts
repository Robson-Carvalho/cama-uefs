import { Router, Request, Response, NextFunction } from "express";
import { AdminController } from "../controllers/AdminController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

const adminController = new AdminController();

router.get(
  "/",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    adminController.get(req, res, next);
  }
);

router.get(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    adminController.getById(req, res, next);
  }
);

router.get(
  "/:email",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    adminController.getByEmail(req, res, next);
  }
);

router.post(
  "/",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    adminController.create(req, res, next);
  }
);

router.delete(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    adminController.delete(req, res, next);
  }
);

router.put(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    adminController.update(req, res, next);
  }
);

router.post(
  "/:id/request-email-change",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    adminController.requestEmailChange(req, res, next);
  }
);

router.post(
  "/confirm-email-change",
  (req: Request, res: Response, next: NextFunction) => {
    adminController.confirmEmailChange(req, res, next);
  }
);

router.put(
  "/:id/toggle-active",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    adminController.toggleActive(req, res, next);
  }
);

export { router as adminRoutes };
