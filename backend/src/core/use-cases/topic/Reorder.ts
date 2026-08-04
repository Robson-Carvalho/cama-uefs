import { ITopicRepository } from "../../domain/repositories/ITopicRepository";

class Reorder {
  constructor(private _topicRepository: ITopicRepository) {}

  async execute(items: { id: string; order: number }[]): Promise<void> {
    await this._topicRepository.updateOrder(items);
  }
}

export { Reorder };
