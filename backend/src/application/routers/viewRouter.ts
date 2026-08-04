import { NextFunction, Request, Response, Router } from "express";
import { ViewController } from "../controllers/viewController";

const router = Router();

const viewController = new ViewController();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  viewController.getViews(req, res, next);
});

export { router as viewRouter };
