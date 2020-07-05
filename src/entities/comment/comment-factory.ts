import {
  IId,
  ISanitize,
  IMd5,
  ISourceFactory,
  ICommentFactory,
  ISource,
} from "../../interfaces/interfaces.ts";

import Comment from "./comment.ts";

export class CommentFactory implements ICommentFactory {
  constructor(
    private Id: IId,
    private md5: IMd5,
    private sanitize: ISanitize,
    private sourceFactory: ISourceFactory,
  ) {}

  public makeComment(
    author: string,
    source: ISource,
    postId: string,
    text: string,
    replyToId?: string,
    id?: string,
    published?: boolean,
    createdOn?: Date,
    modifiedOn?: Date,
  ): Comment {
    return new Comment(
      id || this.Id.makeId(),
      author,
      createdOn,
      source,
      modifiedOn,
      postId,
      published,
      replyToId,
      text,
      this.Id,
      this.md5,
      this.sanitize,
      this.sourceFactory,
    );
  }
}
