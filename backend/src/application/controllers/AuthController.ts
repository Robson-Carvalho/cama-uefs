import { NextFunction, Request, Response } from "express";
import { ValidationError, InternalServerError } from "../../core/errors/Errors";
import { AuthFactory } from "../factories/AuthFactory";

class AuthController {
  private _signIn = AuthFactory.getSignInUseCase();
  private _recoverPassword = AuthFactory.getRecoverPasswordUseCase();
  private _resetPassword = AuthFactory.getResetPasswordUseCase();

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email) next(new ValidationError("O e-mail é obrigatório."));

      if (!password) next(new ValidationError("A senha é obrigatória."));

      const payload = await this._signIn.execute(email, password);

      res.status(200).json(payload);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      next(new InternalServerError(e.message));
    }
  }

  async recoverPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      if (!email) next(new ValidationError("O e-mail é obrigatório."));

      await this._recoverPassword.execute(email);

      res.status(200).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      next(new InternalServerError(e.message));
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;

      if (!token) next(new ValidationError("O token é obrigatório."));
      if (!newPassword) next(new ValidationError("A nova senha é obrigatória."));

      await this._resetPassword.execute(token, newPassword);

      res.status(200).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      next(new InternalServerError(e.message));
    }
  }
}

export { AuthController };
