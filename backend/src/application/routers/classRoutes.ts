import { Router, Request, Response, NextFunction } from "express";
import { ClassController } from "../controllers/ClassController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

const classController = new ClassController();

router.post(
  "/",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    classController.create(req, res, next);
  }
);

router.get(
  "/",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    classController.get(req, res, next);
  }
);

router.get(
  "/content/map",
  (req: Request, res: Response, next: NextFunction) => {
    classController.getContentMap(req, res, next);
  }
);

router.get(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    classController.getById(req, res, next);
  }
);

router.put(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    classController.update(req, res, next);
  }
);

router.delete(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    classController.delete(req, res, next);
  }
);

export { router as classRoutes };
