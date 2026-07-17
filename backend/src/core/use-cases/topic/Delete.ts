import { TopicRepository } from "../../../infrastructure/repositories/TopicRepository";
import { ForbiddenError, NotFoundError } from "../../errors/Errors";

class Delete {
  constructor(private _topicRepository: TopicRepository) {}

  async execute(id: string, userId: string, userRole: string): Promise<void> {
    const topic = await this._topicRepository.getById(id);

    if (!topic) {
      throw new NotFoundError("Tópico não encontrado.");
    }

    if (userRole !== 'ADMIN' && topic.authorId !== userId) {
      throw new ForbiddenError("Apenas o autor original ou um administrador pode apagar este tópico.");
    }

    await this._topicRepository.delete(id);
  }
}

export { Delete };
