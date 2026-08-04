import { ITopicRepository } from "../../domain/repositories/ITopicRepository";

export class UnlikeTopic {
  constructor(private readonly topicRepository: ITopicRepository) {}

  async execute(classPath: string, topicPath: string) {
    return this.topicRepository.unlike(classPath, topicPath);
  }
}
