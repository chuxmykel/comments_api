import {
  ICommentService,
  IHTTPRequest,
  IHTTPResponse,
} from "../../interfaces/interfaces.ts";

import { Comment } from '../../entities/index.ts';

export class CommentController {
  constructor(private commentService: ICommentService) {
    this.addComment = this.addComment.bind(this);
  }
  async addComment(httpRequest: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const {
        author,
        postId,
        replyToId,
        text,
      } = httpRequest.body;

      const comment: Comment = await this.commentService.addComment(
        author,
        httpRequest.ip, // ip
        httpRequest.headers["User-Agent"], // browser
        httpRequest.headers["Referrer"], // referrer
        postId,
        replyToId,
        text,
      );

      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(comment.modifiedOn).toUTCString(),
        },
        statusCode: 201,
        body: {
          status: 201,
          data: {
            id: comment.id,
            author: comment.author,
            text: comment.text,
            source: {
              ip: comment.source.ip,
              browser: comment.source.browser,
              referrer: comment.source.referrer,
            },
            postId: comment.postId,
            published: comment.isPublished,
            hash: comment.hash,
            replyToId: comment.replyToId,
            createdOn: comment.createdOn,
            modifiedOn: comment.modifiedOn,
          },
        },
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  }
}
