import { Comment, ISourceFactory } from "../mod.ts";
import {
  IId,
  ISanitize,
  IMd5,
} from "../../utils/utils.ts";

export interface ICommentFactory {
  makeComment(
    author: string,
    ip: string,
    browser: string,
    referrer: string,
    postId: string,
    text: string,
    id?: string,
    replyToId?: string,
    published?: boolean,
    createdOn?: Date,
    modifiedOn?: Date,
  ): Comment;
}

export class CommentFactory implements ICommentFactory {
  constructor(
    private Id: IId,
    private md5: IMd5,
    private sanitize: ISanitize,
    private sourceFactory: ISourceFactory,
  ) {}

  public makeComment(
    author: string,
    ip: string,
    browser: string,
    referrer: string,
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
      ip,
      browser,
      referrer,
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
