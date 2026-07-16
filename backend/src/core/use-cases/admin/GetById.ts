import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { IResponseAdminById } from "../../dtos/AdminDTOs";

class GetById {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(_id: string): Promise<IResponseAdminById | null> {
    return await this._adminRepository.getById(_id);
  }
}

export { GetById };
