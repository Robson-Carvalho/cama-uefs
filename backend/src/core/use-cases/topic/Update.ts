import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ITopic } from "../../dtos/TopicDTOs";

class Update {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(
    id: string,
    title: string,
    content: string,
    path: string,
    classID: string
  ): Promise<ITopic | null> {
    return await this._topicRepository.update(
      id,
      title,
      content,
      path,
      classID
    );
  }
}

export { Update };
