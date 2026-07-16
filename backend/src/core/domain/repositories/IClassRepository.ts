import { IClass } from "../../dtos/ClassDTOs";
import { IContentMap } from "../../interfaces/IContentMap";

interface IClassRepository {
  create(title: string, path: string): Promise<IClass | null>;

  get(): Promise<IClass[] | []>;

  getByPath(path: string): Promise<IClass | null>;

  getContentMap(): Promise<IContentMap[] | []>;

  getById(id: string): Promise<IClass | null>;

  getLastCreated(): Promise<IClass | null>;

  update(id: string, title: string, path: string): Promise<void>;

  delete(id: string): Promise<void>;
}

export { IClassRepository };
