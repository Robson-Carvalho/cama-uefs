import { IClassRepository } from "../../domain/repositories/IClassRepository";

class Update {
  constructor(private _classRepository: IClassRepository) {}

  async execute(id: string, title: string, path: string): Promise<void> {
    await this._classRepository.update(id, title, path);
  }
}

export { Update };
