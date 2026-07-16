import { Request, Response, NextFunction } from "express";
import { DependecyInjectionClassRepository } from "../containers/DependecyInjectionClassRepository";
import { InternalServerError, ValidationError } from "../../core/errors/Errors";

class ClassController {
  private _get = DependecyInjectionClassRepository.getGetUseCase();
  private _create = DependecyInjectionClassRepository.getCreateUseCase();
  private _getById = DependecyInjectionClassRepository.getGetByIdUseCase();
  private _getContentMap =
    DependecyInjectionClassRepository.getGetContentMapUseCase();
  private _update = DependecyInjectionClassRepository.getUpdateUseCase();
  private _delete = DependecyInjectionClassRepository.getDeleteUseCase();

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const classes = await this._get.execute();

      return res.status(200).json(classes);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }

  async getContentMap(req: Request, res: Response, next: NextFunction) {
    try {
      const contentMap = await this._getContentMap.execute();

      return res.status(200).json(contentMap);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError(e.message));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, path } = req.body;

      if (!title) {
        throw new ValidationError("Title class required");
      }

      if (!path) {
        throw new ValidationError("Path class required");
      }

      const newClass = await this._create.execute(title, path);

      if (!newClass) {
        throw new ValidationError("Failed to create class");
      }

      return res.status(201).json(newClass);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const classData = await this._getById.execute(id);

      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }

      return res.status(200).json(classData);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { title, path } = req.body;

      if (!title) {
        throw new ValidationError("Title class required");
      }

      if (!path) {
        throw new ValidationError("Path class required");
      }

      await this._update.execute(id, title, path);

      return res.status(200).json({ message: "Class updated successfully" });
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this._delete.execute(id);

      return res.status(200).json({ message: "Class deleted successfully" });
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }
}

export { ClassController };
