import { Request, Response, NextFunction } from "express";
import { TopicFactory } from "../factories/TopicFactory";
import { InternalServerError, ValidationError } from "../../core/errors/Errors";

class TopicController {
  private _get = TopicFactory.getGetUseCase();
  private _getByClassId =
    TopicFactory.getGetByClassIdUseCase();
  private _create = TopicFactory.getCreateUseCase();
  private _getById = TopicFactory.getGetByIdUseCase();
  private _getByPath = TopicFactory.getGetByPathUseCase();
  private _update = TopicFactory.getUpdateUseCase();
  private _delete = TopicFactory.getDeleteUseCase();
  private _reorder = TopicFactory.getReorderUseCase();
  private _getTopicByClassAndPath =
    TopicFactory.getTopicByClassAndPathUseCase();

  async getByClassId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

      const topics = await this._getByClassId.execute(id, page, limit);

      return res.status(200).json(topics);
    } catch (e) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }

  async getTopicByClassAndPath(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { classPath, topicPath } = req.params;

      const topic = await this._getTopicByClassAndPath.execute(
        classPath,
        topicPath
      );

      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      return res.status(200).json(topic);
    } catch (e) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Internal server error"));
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await this._get.execute();

      return res.status(200).json(topics);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError(e.message));
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const topic = await this._getById.execute(id);

      return res.status(200).json(topic);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError(e.message));
    }
  }

  async getByPath(req: Request, res: Response, next: NextFunction) {
    try {
      const { path } = req.params;

      const topic = await this._getByPath.execute(path);

      return res.status(200).json(topic);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError(e.message));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, path, classID } = req.body;

      if (!title) {
        throw new ValidationError("O título do tópico é obrigatório.");
      }

      if (!content) {
        throw new ValidationError("O conteúdo do tópico é obrigatório.");
      }

      if (!path) {
        throw new ValidationError("O caminho do tópico é obrigatório.");
      }

      if (!classID) {
        throw new ValidationError("A ID da aula é obrigatória.");
      }

      const topic = await this._create.execute(title, content, path, classID);

      return res.status(201).json(topic);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError(e.message));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { title, content, path, classID, order, isPublished } = req.body;

      if (!title) {
        throw new ValidationError("O título do tópico é obrigatório.");
      }

      if (!content) {
        throw new ValidationError("O conteúdo do tópico é obrigatório.");
      }

      if (!path) {
        throw new ValidationError("O caminho do tópico é obrigatório.");
      }

      if (!classID) {
        throw new ValidationError("A ID da aula é obrigatória.");
      }

      const orderValue = order !== undefined ? parseInt(order, 10) : 0;

      const updatedTopic = await this._update.execute(
        id,
        title,
        content,
        path,
        classID,
        orderValue,
        isPublished
      );

      return res.status(200).json(updatedTopic);
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError(e.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this._delete.execute(id);

      return res.status(204).send();
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError(e.message));
    }
  }

  async reorder(req: Request, res: Response, next: NextFunction) {
    try {
      const { items } = req.body;

      if (!items || !Array.isArray(items)) {
        throw new ValidationError("Itens são obrigatórios para reordenação.");
      }

      await this._reorder.execute(items);

      return res.status(200).json({ message: "Topics reordered successfully" });
    } catch (e: any) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError(e.message));
    }
  }
}

export { TopicController };
