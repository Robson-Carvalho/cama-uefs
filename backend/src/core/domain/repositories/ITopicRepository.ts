import { ITopic } from "../../dtos/TopicDTOs";

interface ITopicRepository {
  getByClassId(id: string, skip?: number, take?: number): Promise<{ data: ITopic[]; total: number }>;
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
    classId: string,
    order: number,
    isPublished?: boolean
  ): Promise<ITopic | null>;
  updateOrder(items: { id: string; order: number }[]): Promise<void>;
  delete(id: string): Promise<void>;
}

export { ITopicRepository };
