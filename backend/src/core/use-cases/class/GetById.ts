import { IClassRepository } from "../../domain/repositories/IClassRepository";
import { IClass } from "../../dtos/ClassDTOs";

class GetById {
  constructor(private _classRepository: IClassRepository) {}

  async execute(id: string): Promise<IClass | null> {
    return await this._classRepository.getById(id);
  }
}

export { GetById };
