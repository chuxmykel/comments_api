import { v4 } from "https://deno.land/std@0.58.0/uuid/mod.ts";
import { createHash } from "https://deno.land/std@0.58.0/hash/mod.ts";

import {
  IId,
  IMd5,
  ISanitize,
  IIsValidIp,
  IHandleModeration,
  IComment,
} from "../interfaces/interfaces.ts";

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
  comment: IComment,
): Promise<IComment> => {
  comment.unPublish();
  return comment;
};
