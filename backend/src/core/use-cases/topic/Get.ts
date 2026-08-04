import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ITopic } from "../../dtos/TopicDTOs";

class Get {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(): Promise<ITopic[] | []> {
    return await this._topicRepository.get();
  }
}

export { Get };
