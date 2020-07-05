import { Router } from "https://deno.land/x/oak@v5.3.1/mod.ts";

import { addComment } from "../composition-root.ts";

const router = new Router();

router.post("/comments", addComment);

export default router;
