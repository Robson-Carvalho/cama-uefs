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
  "/revisions/all",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getAllRevisions(req, res, next);
  }
);

router.get(
  "/revisions/mine",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getMyRevisions(req, res, next);
  }
);

router.get(
  "/revision/:id",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getRevisionById(req, res, next);
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
  "/:id/revisions",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getRevisions(req, res, next);
  }
);

router.get(
  "/:classPath/:topicPath",
  (req: Request, res: Response, next: NextFunction) => {
    topicController.getTopicByClassAndPath(req, res, next);
  }
);

router.post(
  "/:classPath/:topicPath/like",
  (req: Request, res: Response, next: NextFunction) => {
    topicController.like(req, res, next);
  }
);

router.post(
  "/:classPath/:topicPath/unlike",
  (req: Request, res: Response, next: NextFunction) => {
    topicController.unlike(req, res, next);
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
  "/reorder",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.reorder(req, res, next);
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





router.post(
  "/revision/:id/accept",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.acceptRevision(req, res, next);
  }
);

router.post(
  "/revision/:id/reject",
  AuthMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    topicController.rejectRevision(req, res, next);
  }
);

export { router as topicRoutes };
