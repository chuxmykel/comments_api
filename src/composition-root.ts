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
import { CommentFactory, SourceFactory } from "./entities/index.ts";
import { CommentsRepository } from "./data-access/comments/comments-repository.ts";
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
