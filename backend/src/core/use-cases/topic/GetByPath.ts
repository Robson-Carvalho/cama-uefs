import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ITopic } from "../../dtos/TopicDTOs";

class GetByPath {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(path: string): Promise<ITopic | null> {
    return await this._topicRepository.getByPath(path);
  }
}

export { GetByPath };
