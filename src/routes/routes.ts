import { Router } from "https://deno.land/x/oak/mod.ts";

import { addComment } from "../composition-root.ts";

const router = new Router();

router.post("/comments", addComment);

export default router;
