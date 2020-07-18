import { Client } from "https://deno.land/x/postgres@v0.4.2/mod.ts";
import { DATABASE_URL } from "../config.ts";

export interface IDataBaseFactory {
  makeDataBase(): Promise<any>; // This will come from the DB provider so we don't know the shape before hand
}

export class DataBaseFactory implements IDataBaseFactory {
  public async makeDataBase(): Promise<Client> {
    const client = new Client(DATABASE_URL);
    await client.connect();
    return client;
  }
}
