import {
  IIsValidIp,
  ISourceFactory,
} from "../../interfaces/interfaces.ts";

import { Source } from "./source.ts";

export class SourceFactory implements ISourceFactory {
  constructor(private isValidIp: IIsValidIp) {}

  public makeSource(ip: string, browser: string, referrer: string): Source {
    return new Source(
      ip,
      browser,
      referrer,
      this.isValidIp,
    );
  }
}
