import { config } from "https://deno.land/x/dotenv/mod.ts";

config({
  export: true,
});

const { env } = Deno;

export const DATABASE_URL = env.get('DATABASE_URL');
export const PORT = parseInt(env.get('PORT') || `5050`, 10);
