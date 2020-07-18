import {
  ICommentFactory,
  ISourceFactory,
  ICommentService,
  ICommentsRepository,
  IHandleModeration,
} from "../../interfaces/interfaces.ts";

import { Comment } from '../../entities/index.ts';

export class CommentService implements ICommentService {
  constructor(
    private commentFactory: ICommentFactory,
    private commentsRepository: ICommentsRepository,
    private handleModeration: IHandleModeration,
  ) {}

  public async addComment(
    author: string,
    ip: string,
    browser: string,
    referrer: string,
    postId: string,
    replyToId: string | undefined = undefined,
    text: string,
  ): Promise<Comment> {
    const comment = this.commentFactory.makeComment(
      author,
      ip,
      browser,
      referrer,
      postId,
      text,
      replyToId,
    );

    const existingComment: Comment | null = await this.commentsRepository.findByHash(
      comment.hash,
    );

    if (existingComment) {
      return existingComment;
    }

    const moderatedComment: Comment = await this.handleModeration(comment);
    const insertedComment: Comment = await this.commentsRepository.insert(moderatedComment);
    return insertedComment;
  }
}
