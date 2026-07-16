import { TopicRepository } from "../../infrastructure/repositories/TopicRepository";
import { Get } from "../../core/use-cases/topic/Get";
import { GetById } from "../../core/use-cases/topic/GetById";
import { Create } from "../../core/use-cases/topic/Create";
import { Delete } from "../../core/use-cases/topic/Delete";
import { Update } from "../../core/use-cases/topic/Update";
import { GetByPath } from "../../core/use-cases/topic/GetByPath";
import { GetTopicByClassAndPath } from "../../core/use-cases/topic/GetTopicByClassAndPath";
import { GetByClassId } from "../../core/use-cases/topic/GetByClassId";

class DependecyInjectionTopicRepository {
  private static _topicRepository = new TopicRepository();

  static getClassRepository() {
    return this._topicRepository;
  }

  static getGetByClassIdUseCase() {
    return new GetByClassId(this._topicRepository);
  }

  static getGetUseCase() {
    return new Get(this._topicRepository);
  }

  static getGetByIdUseCase() {
    return new GetById(this._topicRepository);
  }

  static getTopicByClassAndPathUseCase() {
    return new GetTopicByClassAndPath(this._topicRepository);
  }

  static getGetByPathUseCase() {
    return new GetByPath(this._topicRepository);
  }

  static getCreateUseCase() {
    return new Create(this._topicRepository);
  }

  static getUpdateUseCase() {
    return new Update(this._topicRepository);
  }

  static getDeleteUseCase() {
    return new Delete(this._topicRepository);
  }
}

export { DependecyInjectionTopicRepository };
