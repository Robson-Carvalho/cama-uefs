import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ITopic } from "../../dtos/TopicDTOs";

class Create {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(
    title: string,
    content: string,
    path: string,
    classID: string
  ): Promise<ITopic | null> {
    return await this._topicRepository.create(title, content, path, classID);
  }
}

export { Create };
