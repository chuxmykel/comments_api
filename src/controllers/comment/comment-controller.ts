import {
  ICommentService,
  IHTTPRequest,
  ISource,
  IHTTPResponse,
  IComment,
} from "../../interfaces/interfaces.ts";

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

      const source: ISource = {
        ip: httpRequest.ip,
        browser: httpRequest.headers["User-Agent"],
        referrer: httpRequest.headers["Referer"],
      };

      const comment: IComment = await this.commentService.addComment(
        author,
        source,
        postId,
        replyToId,
        text,
      );
      // console.log(source)
      // console.log(comment.source) // All properties are undefined
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
