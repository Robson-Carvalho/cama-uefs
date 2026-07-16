import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ITopic } from "../../dtos/TopicDTOs";

class GetByClassId {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(id: string): Promise<ITopic[] | []> {
    return await this._topicRepository.getByClassId(id);
  }
}

export { GetByClassId };
