import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { NotFoundError } from "../../errors/Errors";

class ChangeRole {
  constructor(private _adminRepository: IAdminRepository) {}

  async execute(id: string, role: string): Promise<void> {
    const admin = await this._adminRepository.getById(id);

    if (!admin) {
      throw new NotFoundError("Instrutor não encontrado.");
    }

    await this._adminRepository.changeRole(id, role);
  }
}

export { ChangeRole };
