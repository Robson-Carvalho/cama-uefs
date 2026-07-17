import { Create } from "../../core/use-cases/admin/Create";
import { Delete } from "../../core/use-cases/admin/Delete";
import { Get } from "../../core/use-cases/admin/Get";
import { GetByEmail } from "../../core/use-cases/admin/GetByEmail";
import { GetById } from "../../core/use-cases/admin/GetById";
import { Update } from "../../core/use-cases/admin/Update";
import { AdminRepository } from "../../infrastructure/repositories/AdminRepository";
import { Encryption } from "../../infrastructure/utils/Encryption";

class AdminFactory {
  private static _adminRepository = new AdminRepository();
  private static _encryption = new Encryption();

  static getAdminRepository() {
    return this._adminRepository;
  }

  static getGetUseCase() {
    return new Get(this._adminRepository);
  }

  static getCreateUseCase() {
    return new Create(this._adminRepository, this._encryption);
  }

  static getGetByIdUseCase() {
    return new GetById(this._adminRepository);
  }

  static getGetByEmailUseCase() {
    return new GetByEmail(this._adminRepository);
  }

  static getDeleteUseCase() {
    return new Delete(this._adminRepository);
  }

  static getUpdateUseCase() {
    return new Update(this._adminRepository, this._encryption);
  }
}

export { AdminFactory };
