import { ClassRepository } from "../../../infrastructure/repositories/ClassRepository";
import { IClass } from "../../dtos/ClassDTOs";

class Get {
  constructor(private _classRepository: ClassRepository) {}

  async execute(): Promise<IClass[] | []> {
    return await this._classRepository.get();
  }
}

export { Get };
