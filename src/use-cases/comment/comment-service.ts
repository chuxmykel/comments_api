import { Comment, ICommentFactory } from "../../entities/index.ts";
import { ICommentsRepository } from '../../data-access/comments/comments-repository.ts'
import { IHandleModeration } from "../../utils/utils.ts";

export interface ICommentService {
  addComment(
    author: string,
    ip: string,
    browser: string,
    referrer: string,
    postId: string,
    replyToId: string | undefined,
    text: string,
  ): Promise<Comment>;
}

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

    const existingComment: Comment | null = await this.commentsRepository
      .findByHash(
        comment.hash,
      );

    if (existingComment) {
      return existingComment;
    }

    const moderatedComment: Comment = await this.handleModeration(comment);
    const insertedComment: Comment = await this.commentsRepository.insert(
      moderatedComment,
    );
    return insertedComment;
  }
}
