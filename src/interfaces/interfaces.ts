import { Comment, Source } from "../entities/index.ts";

export interface ISanitize {
  (text: string): string;
}

export interface IId {
  isValidId(id: string): boolean;
  makeId(): string;
}

export interface IMd5 {
  (text: string): string;
}

export interface IIsValidIp {
  (ip: string): boolean;
}

export interface ISourceFactory {
  makeSource(
    ip: string,
    browser: string,
    referrer: string | undefined,
  ): Source;
}

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

export interface ICommentsRepository {
  findByHash(hash: string): Promise<Comment | null>;
  insert(commentDetails: Comment): Promise<Comment>;
}

export interface IHandleModeration {
  (comment: Comment): Promise<Comment>;
}

export interface IDataBaseFactory {
  makeDataBase(): Promise<any>; // This will come from the DB provider so we don't know the shape before hand
}

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

export type KeyValue<T, U> = {
  key: T;
  value: U;
};

export interface IHTTPRequest {
  body: any;
  query: any;
  params: any;
  ip: string;
  method: string;
  path: any;
  headers: {
    "Content-Type": string;
    Referrer: string;
    "User-Agent": string;
  };
}

export interface IHTTPResponse {
  statusCode: number;
  body: any;
  headers: {
    "Content-Type": string;
    "Last-Modified"?: string;
  };
}

export interface IControllerMethod {
  (httpRequest: IHTTPRequest): Promise<any>;
}
