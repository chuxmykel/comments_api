import { Source } from "./source.ts";
import { IIsValidIp } from "../../utils/utils.ts";

export interface ISourceFactory {
  makeSource(
    ip: string,
    browser: string,
    referrer: string | undefined,
  ): Source;
}

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
