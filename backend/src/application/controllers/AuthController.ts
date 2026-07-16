import { NextFunction, Request, Response } from "express";
import { ValidationError, InternalServerError } from "../../core/errors/Errors";
import { DependecyInjectionAuthRepository } from "../containers/DependecyInjectionAuthRepository";

class AuthController {
  private _signIn = DependecyInjectionAuthRepository.getSignInUseCase();
  private _recoverPassword =
    DependecyInjectionAuthRepository.getRecoverPasswordUseCase();

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email) next(new ValidationError("E-mail required."));

      if (!password) next(new ValidationError("Password required."));

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

      if (!email) next(new ValidationError("E-mail required."));

      await this._recoverPassword.execute(email);

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
