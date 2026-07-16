import { ITopic } from "../../dtos/TopicDTOs";

interface ITopicRepository {
  getByClassId(id: string): Promise<ITopic[] | []>;
  get(): Promise<ITopic[] | []>;
  getById(id: string): Promise<ITopic | null>;
  getByPath(path: string): Promise<ITopic | null>;
  getTopicByClassAndPath(
    classPath: string,
    topicPath: string
  ): Promise<ITopic | null>;
  create(
    title: string,
    content: string,
    path: string,
    classId: string
  ): Promise<ITopic | null>;
  update(
    id: string,
    title: string,
    content: string,
    path: string,
    classId: string
  ): Promise<ITopic | null>;
  delete(id: string): Promise<void>;
}

export { ITopicRepository };
