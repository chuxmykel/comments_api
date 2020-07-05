import { DataBaseFactory } from './index.ts';

const dataBaseFactory = new DataBaseFactory();
const dbClient = await dataBaseFactory.makeDataBase();

const createTableQueries = `
  CREATE TABLE IF NOT EXISTS "Comments" (
    id UUID PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    source TEXT NOT NULL,
    "postId" UUID NOT NULL,
    published BOOLEAN NOT NULL,
    "replyToId" UUID,
    text TEXT NOT NULL,
    hash VARCHAR(100) UNIQUE NOT NULL,
    "createdOn" TIMESTAMPTZ NOT NULL,
    "modifiedOn" TIMESTAMPTZ NOT NULL
  );
`;

export const createTables = async () => {
  console.log('creating tables');
  try {
    await dbClient.query(createTableQueries);

    console.log('Tables Created Successfully!!!')
  } catch (e) {
    console.log(e);
  }
};
