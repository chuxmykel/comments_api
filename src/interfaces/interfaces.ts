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

export interface IComment {
  id: string;
  author: string;
  createdOn: Date;
  hash: string;
  modifiedOn: Date;
  postId: string;
  replyToId: string | undefined;
  source: ISource;
  text: string;
  isPublished: boolean;
  isDeleted: boolean;
  markDeleted(): void;
  publish(): void;
  unPublish(): void;
}

export interface IIsValidIp {
  (ip: string): boolean;
}

export interface ISource {
  ip: string;
  browser: string;
  referrer: string | undefined;
}

export interface ISourceFactory {
  makeSource(
    ip: string,
    browser: string,
    referrer: string | undefined,
  ): ISource;
}

export interface ICommentFactory {
  makeComment(
    author: string,
    source: ISource,
    postId: string,
    text: string,
    id?: string,
    replyToId?: string,
    published?: boolean,
    createdOn?: Date,
    modifiedOn?: Date,
  ): IComment;
}

export interface ICommentsRepository {
  findByHash(hash: string): Promise<IComment | null>;
  insert(commentDetails: IComment): Promise<IComment>;
}

export interface IHandleModeration {
  (comment: IComment): Promise<IComment>;
}

export interface IDataBaseFactory {
  makeDataBase(): Promise<any>; // This will come from the DB provider so we don't know the shape before hand
}

export interface ICommentService {
  addComment(
    author: string,
    source: ISource,
    postId: string,
    replyToId: string | undefined,
    text: string,
  ): Promise<IComment>;
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
    Referer: string | undefined;
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
