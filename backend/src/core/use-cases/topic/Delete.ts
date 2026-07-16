import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";

class Delete {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(id: string): Promise<void> {
    await this._topicRepository.delete(id);
  }
}

export { Delete };
