import { IIsValidIp } from "../../interfaces/interfaces.ts";

export class Source {
  constructor(
    private _ip: string,
    private _browser: string,
    private _referrer: string | undefined,
    private isValidIp: IIsValidIp,
  ) {
    if (!this.isValidIp(_ip)) {
      throw new Error("Comment source must contain a valid IP.");
    }
  }

  get ip(): string {
    return this._ip;
  }

  get browser(): string {
    return this._browser;
  }

  get referrer(): string | undefined {
    return this._referrer;
  }
}
