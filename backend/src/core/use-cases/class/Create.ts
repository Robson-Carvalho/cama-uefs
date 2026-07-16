import { IClassRepository } from "../../domain/repositories/IClassRepository";
import { IClass } from "../../dtos/ClassDTOs";

class Create {
  constructor(private _classRepository: IClassRepository) {}

  async execute(title: string, path: string): Promise<IClass | null> {
    return await this._classRepository.create(title, path);
  }
}

export { Create };
