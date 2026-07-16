import { Router, Request, Response, NextFunction } from "express";
import { TopicController } from "../controllers/TopicController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const topicController = new TopicController();

router.get(
  "/",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.get(req, res, next);
  }
);

router.get(
  "/class/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getByClassId(req, res, next);
  }
);

router.get(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getById(req, res, next);
  }
);

router.get(
  "/:classPath/:topicPath",
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getTopicByClassAndPath(req, res, next);
  }
);

router.get(
  "/path/:path",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getByPath(req, res, next);
  }
);

router.post(
  "/",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.create(req, res, next);
  }
);

router.put(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.update(req, res, next);
  }
);

router.delete(
  "/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.delete(req, res, next);
  }
);

export { router as topicRoutes };
