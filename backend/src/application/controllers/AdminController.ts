import { Request, Response, NextFunction } from "express";
import { DependecyInjectionAdminRepository } from "../containers/DependecyInjectionAdminRepository";
import { InternalServerError, ValidationError } from "../../core/errors/Errors";

class AdminController {
  private _get = DependecyInjectionAdminRepository.getGetUseCase();
  private _getById = DependecyInjectionAdminRepository.getGetByIdUseCase();
  private _getByEmail =
    DependecyInjectionAdminRepository.getGetByEmailUseCase();
  private _create = DependecyInjectionAdminRepository.getCreateUseCase();
  private _update = DependecyInjectionAdminRepository.getUpdateUseCase();
  private _delete = DependecyInjectionAdminRepository.getDeleteUseCase();

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await this._get.execute();

      return res.status(200).json(admins);
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

      const admin = await this._getById.execute(id);

      return res.status(200).json(admin);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }

  async getByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const admin = await this._getByEmail.execute(email);

      return res.status(200).json(admin);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        throw new ValidationError("Name required");
      }

      if (!email) {
        throw new ValidationError("Email required");
      }

      if (!password) {
        throw new ValidationError("Password required");
      }

      const _id = await this._create.execute(name, email, password);

      return res.status(200).json(_id);
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

      const { name, email, password } = req.body;

      if (!name) {
        throw new ValidationError("Name required");
      }

      if (!email) {
        throw new ValidationError("Email required");
      }

      if (!password) {
        throw new ValidationError("Password required");
      }

      await this._update.execute(id, name, email, password);

      return res.status(200).send();
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

      return res.status(200).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }
}

export { AdminController };
