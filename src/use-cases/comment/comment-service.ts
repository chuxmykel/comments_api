import {
  ICommentFactory,
  ISource,
  IComment,
  ICommentsRepository,
  IHandleModeration,
  ICommentService,
} from "../../interfaces/interfaces.ts";

export class CommentService implements ICommentService {
  constructor(
    private commentFactory: ICommentFactory,
    private commentsRepository: ICommentsRepository,
    private handleModeration: IHandleModeration,
  ) {}

  public async addComment(
    author: string,
    source: ISource,
    postId: string,
    replyToId: string | undefined = undefined,
    text: string,
  ): Promise<IComment> {
    const comment = this.commentFactory.makeComment(
      author,
      source,
      postId,
      text,
      replyToId,
    );

    const existingComment: IComment | null = await this.commentsRepository.findByHash(
      comment.hash,
    );

    if (existingComment) {
      return existingComment;
    }

    const moderatedComment: IComment = await this.handleModeration(comment);
    const insertedComment: IComment = await this.commentsRepository.insert(moderatedComment);
    return insertedComment;
  }
}
