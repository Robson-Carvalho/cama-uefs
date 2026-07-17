import { Request, Response, NextFunction } from "express";
import { TopicFactory } from "../factories/TopicFactory";
import { UnauthorizedError, InternalServerError, ValidationError } from "../../core/errors/Errors";
import { TopicRevisionRepository } from "../../infrastructure/repositories/TopicRevisionRepository";

const revisionRepo = new TopicRevisionRepository();

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
  private _like = TopicFactory.getLikeTopicUseCase();
  private _unlike = TopicFactory.getUnlikeTopicUseCase();
  private _incrementView = TopicFactory.getIncrementViewTopicUseCase();

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

      return next(new InternalServerError("Erro interno do servidor."));
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

      await this._incrementView.execute(classPath, topicPath);
      
      const topicWithView = {
        ...topic,
        views: (topic as any).views !== undefined ? (topic as any).views + 1 : 1
      };

      return res.status(200).json(topicWithView);
    } catch (e) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }

      return next(new InternalServerError("Erro interno do servidor."));
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

      const topic = await this._create.execute(title, content, path, classID, (req as any).user_id);

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
        (req as any).user_id,
        isPublished
      );

      if ((updatedTopic as any)?._isRevision) {
        return res.status(202).json({ message: "Sua modificação foi enviada para aprovação do autor original.", isRevision: true });
      }

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

  async like(req: Request, res: Response, next: NextFunction) {
    try {
      const { classPath, topicPath } = req.params;
      const updated = await this._like.execute(classPath, topicPath);
      if (!updated) {
        return res.status(404).json({ message: "Topic not found" });
      }
      return res.status(200).json(updated);
    } catch (e) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }
      return next(new InternalServerError("Erro interno"));
    }
  }

  async unlike(req: Request, res: Response, next: NextFunction) {
    try {
      const { classPath, topicPath } = req.params;
      const updated = await this._unlike.execute(classPath, topicPath);
      if (!updated) {
        return res.status(404).json({ message: "Topic not found" });
      }
      return res.status(200).json(updated);
    } catch (e) {
      if (!(e instanceof InternalServerError)) {
        return next(e);
      }
      return next(new InternalServerError("Erro interno"));
    }
  }

  async getRevisions(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const revisions = await revisionRepo.getPendingByTopicId(id);
      return res.status(200).json(revisions);
    } catch (e) {
      return next(new InternalServerError("Erro interno"));
    }
  }

  async getAllRevisions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user_id;
      const role = (req as any).user_role;
      const revisions = await revisionRepo.getAllPending(userId, role);
      return res.status(200).json(revisions);
    } catch (e) {
      return next(new InternalServerError("Erro interno"));
    }
  }

  async getMyRevisions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user_id;
      const revisions = await revisionRepo.getMyRevisions(userId);
      return res.status(200).json(revisions);
    } catch (e) {
      return next(new InternalServerError("Erro interno"));
    }
  }

  async getRevisionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const revision = await revisionRepo.getById(id);
      if (!revision) {
        return res.status(404).json({ message: "Revisão não encontrada." });
      }
      return res.status(200).json(revision);
    } catch (e) {
      return next(new InternalServerError("Erro interno"));
    }
  }

  async acceptRevision(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user_id;
      await revisionRepo.accept(id, userId);
      return res.status(200).json({ message: "Revisão aceita." });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  async rejectRevision(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user_id;
      await revisionRepo.reject(id, userId);
      return res.status(200).json({ message: "Revisão rejeitada." });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}

export { TopicController };
