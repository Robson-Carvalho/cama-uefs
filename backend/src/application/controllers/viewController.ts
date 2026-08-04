import { Request, Response, NextFunction } from "express";
import { ViewRepository } from "../../infrastructure/repositories/viewRepository";

const viewRepository = new ViewRepository();

class ViewController {
  async getViews(req: Request, res: Response, next: NextFunction) {
    try {
      const views = await viewRepository.incrementViews();
      return res.status(200).json({ views });
    } catch (error) {
      next(error);
    }
  }
}

export { ViewController };
