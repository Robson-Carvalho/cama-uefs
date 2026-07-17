import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ITopic } from "../../dtos/TopicDTOs";

class GetByClassId {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(id: string, page: number = 1, limit: number = 10): Promise<{ data: ITopic[]; total: number }> {
    const skip = (page - 1) * limit;
    return await this._topicRepository.getByClassId(id, skip, limit);
  }
}

export { GetByClassId };
