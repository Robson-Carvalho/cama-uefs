import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { IResponseAdminById } from "../../dtos/AdminDTOs";

class GetByEmail {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(email: string): Promise<IResponseAdminById | null> {
    return await this._adminRepository.getByEmail(email);
  }
}

export { GetByEmail };
