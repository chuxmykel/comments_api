import { Router } from "../../deps.ts";

import { addComment } from "../composition-root.ts";

const router = new Router();

router.post("/comments", addComment);

export default router;
