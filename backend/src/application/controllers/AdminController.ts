import { Request, Response, NextFunction } from "express";
import { AdminFactory } from "../factories/AdminFactory";
import { InternalServerError, ValidationError, ForbiddenError } from "../../core/errors/Errors";

class AdminController {
  private _get = AdminFactory.getGetUseCase();
  private _getById = AdminFactory.getGetByIdUseCase();
  private _getByEmail =
    AdminFactory.getGetByEmailUseCase();
  private _create = AdminFactory.getCreateUseCase();
  private _update = AdminFactory.getUpdateUseCase();
  private _delete = AdminFactory.getDeleteUseCase();
  private _requestEmailChange = AdminFactory.getRequestEmailChangeUseCase();
  private _confirmEmailChange = AdminFactory.getConfirmEmailChangeUseCase();
  private _toggleActive = AdminFactory.getToggleActiveUseCase();

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      
      const result = await this._get.execute(page, limit);

      return res.status(200).json(result);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Erro interno do servidor."));
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

      return next(new InternalServerError("Erro interno do servidor."));
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

      return next(new InternalServerError("Erro interno do servidor."));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_role } = req as any;

      if (user_role !== "ADMIN") {
        throw new ForbiddenError("Apenas administradores podem realizar esta ação.");
      }

      const { name, email } = req.body;

      if (!name) {
        throw new ValidationError("O nome é obrigatório.");
      }

      if (!email) {
        throw new ValidationError("O e-mail é obrigatório.");
      }

      const _id = await this._create.execute(name, email);

      return res.status(200).json(_id);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Erro interno do servidor."));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { name, email, password } = req.body;

      if (!name) {
        throw new ValidationError("O nome é obrigatório.");
      }

      if (!email) {
        throw new ValidationError("O e-mail é obrigatório.");
      }

      await this._update.execute(id, name, email, password);

      return res.status(200).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Erro interno do servidor."));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_role } = req as any;

      if (user_role !== "ADMIN") {
        throw new ForbiddenError("Apenas administradores podem excluir instrutores.");
      }

      const { id } = req.params;

      await this._delete.execute(id);

      return res.status(200).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Erro interno do servidor."));
    }
  }

  async requestEmailChange(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { newEmail } = req.body;

      if (!newEmail) {
        throw new ValidationError("O novo e-mail é obrigatório.");
      }

      await this._requestEmailChange.execute(id, newEmail);

      return res.status(200).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }
      return next(new InternalServerError("Erro interno do servidor."));
    }
  }

  async confirmEmailChange(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;

      if (!token) {
        throw new ValidationError("O token é obrigatório.");
      }

      await this._confirmEmailChange.execute(token);

      return res.status(200).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }
      return next(new InternalServerError("Erro interno do servidor."));
    }
  }

  async toggleActive(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_role } = req as any;

      if (user_role !== "ADMIN") {
        throw new ForbiddenError("Apenas administradores podem alterar o status.");
      }

      const { id } = req.params;
      const { active } = req.body;

      if (typeof active !== "boolean") {
        throw new ValidationError("O status (ativo/inativo) é obrigatório.");
      }

      await this._toggleActive.execute(id, active);

      return res.status(200).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }
      return next(new InternalServerError("Erro interno do servidor."));
    }
  }
}

export { AdminController };
