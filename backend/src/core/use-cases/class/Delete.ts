import { IClassRepository } from "../../domain/repositories/IClassRepository";

class Delete {
  constructor(private _classRepository: IClassRepository) {}

  async execute(id: string): Promise<void> {
    await this._classRepository.delete(id);
  }
}

export { Delete };
