import { Comment } from "../entities/mod.ts";
import { v4, createHash } from "../../deps.ts";

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

export interface IHandleModeration {
  (comment: Comment): Promise<Comment>;
}


export const Id: IId = {
  isValidId: (id: string) => v4.validate(id),
  makeId: () => v4.generate(),
};

export const md5: IMd5 = (str: string): string => {
  const hash = createHash("md5");
  hash.update(str);
  return hash.toString();
};

export const sanitize: ISanitize = (text: string): string => text;

export const isValidIp: IIsValidIp = (ip: string): boolean =>
  typeof ip === "string";

export const handleModeration: IHandleModeration = async (
  comment: Comment,
): Promise<Comment> => {
  comment.unPublish();
  return comment;
};
