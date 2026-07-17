import { Request, Response, NextFunction } from "express";
import { ClassFactory } from "../factories/ClassFactory";
import { InternalServerError, ValidationError } from "../../core/errors/Errors";

class ClassController {
  private _get = ClassFactory.getGetUseCase();
  private _create = ClassFactory.getCreateUseCase();
  private _getById = ClassFactory.getGetByIdUseCase();
  private _getContentMap =
    ClassFactory.getGetContentMapUseCase();
  private _update = ClassFactory.getUpdateUseCase();
  private _delete = ClassFactory.getDeleteUseCase();
  private _reorder = ClassFactory.getReorderUseCase();

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

      const classes = await this._get.execute(page, limit);

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
        throw new ValidationError("O título da aula é obrigatório.");
      }

      if (!path) {
        throw new ValidationError("O caminho da aula é obrigatório.");
      }

      const newClass = await this._create.execute(title, path);

      if (!newClass) {
        throw new ValidationError("Falha ao criar a aula.");
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

      const { title, path, order } = req.body;

      if (!title) {
        throw new ValidationError("O título da aula é obrigatório.");
      }

      if (!path) {
        throw new ValidationError("O caminho da aula é obrigatório.");
      }

      const orderValue = order !== undefined ? parseInt(order, 10) : 0;

      await this._update.execute(id, title, path, orderValue);

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

  async reorder(req: Request, res: Response, next: NextFunction) {
    try {
      const { items } = req.body;

      if (!items || !Array.isArray(items)) {
        throw new ValidationError("Itens são obrigatórios para reordenação.");
      }

      await this._reorder.execute(items);

      return res.status(200).json({ message: "Classes reordered successfully" });
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }
}

export { ClassController };
