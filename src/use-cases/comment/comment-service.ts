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

    const exists: IComment | null = await this.commentsRepository.findByHash(
      comment.hash,
    );

    if (exists) {
      return exists;
    }

    const moderated = await this.handleModeration(comment);
    return this.commentsRepository.insert(moderated);
  }
}
