import { IClassRepository } from "../../domain/repositories/IClassRepository";
import { IContentMap } from "../../interfaces/IContentMap";

class GetContentMap {
  constructor(private _classRepository: IClassRepository) {}

  async execute(): Promise<IContentMap[] | []> {
    return await this._classRepository.getContentMap();
  }
}

export { GetContentMap };
