import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ITopic } from "../../dtos/TopicDTOs";

class GetById {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(id: string): Promise<ITopic | null> {
    return await this._topicRepository.getById(id);
  }
}

export { GetById };
