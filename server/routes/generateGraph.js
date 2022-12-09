import { Router } from "express"

import { createGraph } from "../controllers/generateGraph.js"

const router = Router();

// Create routes (declarations)
router.post('/', createGraph)

export default router