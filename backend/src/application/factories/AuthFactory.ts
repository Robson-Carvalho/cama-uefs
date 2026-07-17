import { RecoverPassword } from "../../core/use-cases/auth/RecoverPassword";
import { SignIn } from "../../core/use-cases/auth/SignIn";

import { ResetPassword } from "../../core/use-cases/auth/ResetPassword";
import { AdminRepository } from "../../infrastructure/repositories/AdminRepository";
import { Encryption } from "../../infrastructure/utils/Encryption";
import { JWT } from "../../infrastructure/utils/JWT";
import { Mailer } from "../../infrastructure/services/email/Mailer";

class AuthFactory {
  private static _adminRepository = new AdminRepository();
  private static _encryption = new Encryption();
  private static _jwt = new JWT();
  private static _mailer = new Mailer();

  static getAdminRepository() {
    return this._adminRepository;
  }

  static getSignInUseCase() {
    return new SignIn(this._adminRepository, this._encryption, this._jwt);
  }

  static getRecoverPasswordUseCase() {
    return new RecoverPassword(this._adminRepository, this._mailer, this._jwt);
  }

  static getResetPasswordUseCase() {
    return new ResetPassword(this._adminRepository, this._encryption, this._jwt);
  }
}

export { AuthFactory };
