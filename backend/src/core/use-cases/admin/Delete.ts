import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";

class Delete {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(_id: string): Promise<void> {
    await this._adminRepository.delete(_id);
  }
}

export { Delete };
