import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { IGetAdmins } from "../../dtos/AdminDTOs";

class Get {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(page: number = 1, limit: number = 10): Promise<{ data: IGetAdmins[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;
    return await this._adminRepository.get(skip, take);
  }
}

export { Get };
