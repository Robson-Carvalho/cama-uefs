import { ITopicRepository } from "../../domain/repositories/ITopicRepository";

export class LikeTopic {
  constructor(private readonly topicRepository: ITopicRepository) {}

  async execute(classPath: string, topicPath: string) {
    return this.topicRepository.like(classPath, topicPath);
  }
}
