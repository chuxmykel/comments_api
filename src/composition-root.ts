import {
  Id,
  md5,
  sanitize,
  isValidIp,
  handleModeration,
} from "./utils/utils.ts";

import { HTTPFrameworkControllerAdaptor } from "./http-framework-adaptor/http-framework-adaptor.ts";
import { CommentController } from "./controllers/comment/comment-controller.ts";
import { CommentService } from "./use-cases/comment/comment-service.ts";
import { CommentFactory } from "./entities/comment/comment-factory.ts";
import { CommentsRepository } from "./data-access/comments/comments-repository.ts";
import { SourceFactory } from "./entities/source/source-factory.ts";
import { DataBaseFactory } from "../db/index.ts";

const httpFrameworkControllerAdaptor = new HTTPFrameworkControllerAdaptor();

const sourceFactory = new SourceFactory(isValidIp);

const commentFactory = new CommentFactory(
  Id,
  md5,
  sanitize,
  sourceFactory,
);

const dataBaseFactory = new DataBaseFactory();

const commentsRepository = new CommentsRepository(
  commentFactory,
  sourceFactory,
  dataBaseFactory,
);

const commentService = new CommentService(
  commentFactory,
  commentsRepository,
  handleModeration,
);

const commentController = new CommentController(commentService);

export const addComment = httpFrameworkControllerAdaptor.makeOakCallback(
  commentController.addComment,
);
