import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { NotFoundError } from "../../errors/Errors";

class ToggleActive {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(id: string, active: boolean): Promise<void> {
    const admin = await this._adminRepository.getById(id);

    if (!admin) {
      throw new NotFoundError("Admin not found.");
    }

    // Protect super admin from being deactivated?
    // It depends, but for now we just toggle.
    await this._adminRepository.toggleActive(id, active);
  }
}

export { ToggleActive };
