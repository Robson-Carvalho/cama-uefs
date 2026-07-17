import { ITopicRepository } from "../../domain/repositories/ITopicRepository";

export class IncrementViewTopic {
  constructor(private readonly topicRepository: ITopicRepository) {}

  async execute(classPath: string, topicPath: string) {
    return this.topicRepository.incrementViews(classPath, topicPath);
  }
}
