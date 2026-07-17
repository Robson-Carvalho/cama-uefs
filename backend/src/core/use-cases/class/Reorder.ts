import { IClassRepository } from "../../domain/repositories/IClassRepository";

class Reorder {
  constructor(private _classRepository: IClassRepository) {}

  async execute(items: { id: string; order: number }[]): Promise<void> {
    await this._classRepository.updateOrder(items);
  }
}

export { Reorder };
