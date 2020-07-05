import { Application } from "https://deno.land/x/oak@v5.3.1/mod.ts";

import { PORT } from "../config.ts";
import router from "./routes/routes.ts";
import { createTables } from "../db/createTables.ts";

const app = new Application();

app.use(async ({ response }, nextFn) => {
  try {
    await nextFn();
  } catch (err) {
    response.status = 500;
    response.body = { msg: err.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(({ response }) => {
  response.status = 404;
  response.body = { msg: "Not Found" };
});

await createTables();
console.log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });
