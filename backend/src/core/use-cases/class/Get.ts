import { ClassRepository } from "../../../infrastructure/repositories/ClassRepository";
import { IClass } from "../../dtos/ClassDTOs";

class Get {
  constructor(private _classRepository: ClassRepository) {}

  async execute(page: number = 1, limit: number = 10): Promise<{ data: IClass[]; total: number }> {
    const skip = (page - 1) * limit;
    return await this._classRepository.get(skip, limit);
  }
}

export { Get };
