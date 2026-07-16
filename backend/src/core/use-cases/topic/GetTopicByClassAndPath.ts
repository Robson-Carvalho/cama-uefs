import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ITopic } from "../../dtos/TopicDTOs";

class GetTopicByClassAndPath {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(classPath: string, topicPath: string): Promise<ITopic | null> {
    return await this._topicRepository.getTopicByClassAndPath(
      classPath,
      topicPath
    );
  }
}

export { GetTopicByClassAndPath };
