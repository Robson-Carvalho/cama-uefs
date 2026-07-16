import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { IGetAdmins } from "../../dtos/AdminDTOs";

class Get {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(): Promise<IGetAdmins[] | []> {
    return await this._adminRepository.get();
  }
}

export { Get };
