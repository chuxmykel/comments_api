import { Client } from "https://deno.land/x/postgres@v0.4.2/mod.ts";
import { DATABASE_URL } from "../config.ts";
import { IDataBaseFactory } from "../src/interfaces/interfaces.ts";

export class DataBaseFactory implements IDataBaseFactory {
  public async makeDataBase(): Promise<Client> {
    const client = new Client(DATABASE_URL);
    await client.connect();
    return client;
  }
}
