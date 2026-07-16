import { Request, Response, NextFunction } from "express";
import { DependecyInjectionTopicRepository } from "../containers/DependecyInjectionTopicRepository";
import { InternalServerError, ValidationError } from "../../core/errors/Errors";

class TopicController {
  private _get = DependecyInjectionTopicRepository.getGetUseCase();
  private _getByClassId =
    DependecyInjectionTopicRepository.getGetByClassIdUseCase();
  private _create = DependecyInjectionTopicRepository.getCreateUseCase();
  private _getById = DependecyInjectionTopicRepository.getGetByIdUseCase();
  private _getByPath = DependecyInjectionTopicRepository.getGetByPathUseCase();
  private _update = DependecyInjectionTopicRepository.getUpdateUseCase();
  private _delete = DependecyInjectionTopicRepository.getDeleteUseCase();
  private _getTopicByClassAndPath =
    DependecyInjectionTopicRepository.getTopicByClassAndPathUseCase();

  async getByClassId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const topics = await this._getByClassId.execute(id);

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
        throw new ValidationError("Title class required");
      }

      if (!content) {
        throw new ValidationError("Content class required");
      }

      if (!path) {
        throw new ValidationError("Path class required");
      }

      if (!classID) {
        throw new ValidationError("ClassID class required");
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

      const { title, content, path, classID } = req.body;

      if (!title) {
        throw new ValidationError("Title class required");
      }

      if (!content) {
        throw new ValidationError("Content class required");
      }

      if (!path) {
        throw new ValidationError("Path class required");
      }

      if (!classID) {
        throw new ValidationError("ClassID class required");
      }

      const updatedTopic = await this._update.execute(
        id,
        title,
        content,
        path,
        classID
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
}

export { TopicController };
