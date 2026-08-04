import { Request, Response, Router } from "express";
import { classRoutes } from "./classRoutes";
import { topicRoutes } from "./topicRoutes";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { viewRouter } from "./viewRouter";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to CAMA/UEFS!" });
});

router.get(
  "/test/auth",
  AuthMiddleware,
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Authenticated" });
  }
);

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/class", classRoutes);
router.use("/topic", topicRoutes);
router.use("/view", viewRouter);

export { router };
